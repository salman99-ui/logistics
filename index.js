const express = require("express");
const cors = require("cors");
const connection = require("./database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
  connection.query(`SELECT * FROM user`, (err, results) => {
    if (err) {
      res.json({ message: "error" });
    } else {
      res.json({
        data: results,
      });
    }
  });
  connection.end();
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;

  connection.query(`SELECT * FROM user where id = ${id}`, (err, results) => {
    if (results) {
      res.json({ data: results });
    } else {
      res.json({
        message: "error",
      });
    }
  });
});

app.post("/login", (req, res) => {
  const queryData = req.body;
  connection.query(
    `select * from user where email = '${queryData.email}' and password = '${queryData.password}'`,
    (err, results) => {
      if (results) {
        res.json({ data: results[0] });
      } else {
        console.log(err);
        res.json({
          message: "error",
        });
      }
    }
  );
});

app.post("/create-user", (req, res) => {
  const { nama, email, password } = req.body;
  connection.query(
    `insert into user (nama,email,role,password) values('${nama}','${email}',2,'${password}')`,
    (err, results) => {
      if (err) {
        res.json({ message: "error" });
      } else {
        res.json({ message: "Success" });
      }
    }
  );
  connection.end();
});

app.post("/reservasi", (req, res) => {
  const { user_id, nama, email, alamat, date } = req.body;
  connection.query(
    `select * from day_count where date = '${date}'`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.json({ message: "error" });
      } else if (results.length > 0 && results.length < 5) {
        connection.query(
          `UPDATE day_count SET count = count + 1 where date = '${date}'`,
          (errUpdate, resultsUpdate) => {
            if (errUpdate) {
              console.log(errUpdate);
              res.json({ message: "error" });
            } else {
              res.json({
                message: "ok",
              });
            }
          }
        );
      } else if (results.length === 5) {
        res.json({
          message: "max 5",
        });
      } else {
        connection.query(
          `insert into day_count (date,count) values('${date}',1)`,
          (err, results) => {
            console.log(err, "101");
            if (err) {
              res.json({ message: "error" });
              console.log("err 3");
            } else {
              console.log("masuk sini");
              connection.query(
                `insert into reservasi(user_id,nama,email,alamat,date,status) values(${user_id},'${nama}','${email}','${alamat}','${date}','WAITING')`,
                (errInsert, resultsInsert) => {
                  if (errInsert) {
                    console.log(errInsert);
                    res.json({ message: "error" });
                  } else {
                    console.log("masukkk");
                    res.json({ message: "OK" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

app.get("/transaction-history/:user_id", (req, res) => {
  const { user_id } = req.params;
  connection.query(
    `select * from reservasi where user_id = ${user_id}`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.json({ message: "error" });
      } else {
        res.json({ data: results });
      }
    }
  );
});

app.get("/transaction-history", (req, res) => {
  connection.query(`select * from reservasi`, (err, results) => {
    if (err) {
      res.json({ message: "error" });
    } else {
      res.json({ data: results });
    }
  });
});

app.put("/update-status/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    `UPDATE reservasi set status = 'PROCESS' where id = ${id}`,
    (err, results) => {
      if (err) {
        res.json({ message: "error" });
      } else {
        res.json({ data: results });
      }
    }
  );
});

app.post("/update-reservasi/:id", (req, res) => {
  const { id } = req.params;
  const { parts } = req.body;

  parts?.forEach((item, index) => {
    connection.query(
      `INSERT INTO item_part(id_reservasi,part,qty,price) values(${id},'${item?.part}',${item?.qty},${item?.price})`,
      (err, results) => {
        if (err) {
          res.json({ message: "error" });
        }
        if (parts.length === index + 1) {
          res.json({ message: "success" });
        }
      }
    );
  });
});

app.listen(4000, () => {
  console.log("server running");
});
