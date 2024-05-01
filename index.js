import express from "express";
import cors from "cors";
import connection from "./database/index.js";
import nodemailer from "nodemailer";
import {
  getTemplateEmail,
  getTemplateEmailPembayaran,
} from "./constant/index.js";

const app = express();

const email_gmail = "slmndamanhuri@gmail.com";
const pass_gmail = "nwco ilfz xrnt otxz";

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

// app.post("/test-email", (req, res) => {
//   const email = "slmndamanhuri@gmail.com";
//   const transport = nodemailer.createTransport({
//     port: 465, // true for 465, false for other ports
//     host: "smtp.gmail.com",
//     auth: {
//       user: "slmndamanhuri@gmail.com",
//       pass: "nwco ilfz xrnt otxz",
//     },
//     secure: true,
//   });

//   transport
//     .sendMail(getTemplateEmail(email))
//     .then(() => {
//       res.json({
//         message: "OK",
//       });
//     })
//     .catch(() => {
//       res.json({
//         message: "ERROR",
//       });
//     });
// });

app.post("/reservasi", (req, res) => {
  // select * from reservasi left join item_part on reservasi.id = item_part.id_reservasi;
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
            if (err) {
              res.json({ message: "error" });
            } else {
              connection.query(
                `insert into reservasi(user_id,nama,email,alamat,date,status) values(${user_id},'${nama}','${email}','${alamat}','${date}','WAITING')`,
                (errInsert, resultsInsert) => {
                  if (errInsert) {
                    res.json({ message: "error" });
                  } else {
                    const transport = nodemailer.createTransport({
                      port: 465, // true for 465, false for other ports
                      host: "smtp.gmail.com",
                      auth: {
                        user: email_gmail,
                        pass: pass_gmail,
                      },
                      secure: true,
                    });

                    transport
                      .sendMail(getTemplateEmail(email))
                      .then(() => {
                        console.log("success");
                        res.json({
                          message: "OK",
                          id: resultsInsert.insertId,
                        });
                      })
                      .catch(() => {
                        res.json({
                          message: "ERROR",
                        });
                      });
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

app.get("/reservasi/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    `select reservasi.* , payment.id as p_id, payment.status as p_status, payment.external_id as p_external_id , payment.va as p_va , payment.id_reservasi as p_id_reservasi , payment.va , payment.bank_code , payment.price , payment.status as p_status from reservasi left join payment on reservasi.id = payment.id_reservasi where reservasi.id = ${id}`,
    (err, results) => {
      if (err) {
        res.json({ message: "error" });
      } else {
        res.json({
          data: results[0],
        });
      }
    }
  );
});

app.get("/total-transaksi/payment", (req, res) => {
  connection.query(
    `select sum(price) as total from payment where status = 'DONE'`,
    (err, results) => {
      if (err) {
        res.json({ message: "error" });
      } else {
        res.json({
          data: results[0].total,
        });
      }
    }
  );
});

app.get("/total-transaksi", (req, res) => {
  connection.query(
    `select count(*) as total from payment where status = 'DONE'`,
    (err, results) => {
      if (err) {
        res.json({ message: "error" });
      } else {
        res.json({
          data: results[0].total,
        });
      }
    }
  );
});

app.post("/create-va", async (req, res) => {
  const { id_payment, account_number, bank_code, external_id } = req.body;

  connection.query(
    `update payment set status = 'WAITING',external_id = '${external_id}', va = '${account_number}', bank_code = '${bank_code}' where id_reservasi = ${id_payment} `,
    (err, responseData) => {
      if (err) {
        res.json({ message: "error" });
      } else {
        res.json({ data: "success" });
      }
    }
  );
});

app.post("/create-payment", (req, res) => {
  const { id, external_id, amount } = req.body;
  connection.query(
    `insert into payment(id_reservasi,external_id,price) values(${id},${external_id},${amount})`,
    (err, results) => {
      if (err) {
        res.json({ message: "error" });
      } else {
        // update is have VA
        connection.query(
          `update reservasi set is_create_va = 1 where id = ${id}`,
          (errReservasi, resultsReservasi) => {
            if (errReservasi) {
              res.json({ message: "error update reservasi" });
            } else {
              res.json({ message: "success create payment" });
            }
          }
        );
      }
    }
  );
});

app.post("/xendit-payment", (req, res) => {
  const { external_id } = req.body;

  connection.query(
    `update payment set status = 'DONE' where external_id = '${external_id}'`,
    (err, results) => {
      if (err) {
        res.json({ message: "error" });
      } else {
        connection.query(
          `select * from payment where external_id = '${external_id}'`,
          (errP, resultsP) => {
            if (errP) {
              res.json({ message: "error" });
            } else {
              const id_reservasi = resultsP[0]?.id_reservasi;

              connection.query(
                `select * from reservasi where id = ${id_reservasi}`,
                (errR, resultsR) => {
                  if (errR) {
                    res.json({ message: "error" });
                  } else {
                    const email_reservasi = resultsR[0]?.email;
                    const transport = nodemailer.createTransport({
                      port: 465, // true for 465, false for other ports
                      host: "smtp.gmail.com",
                      auth: {
                        user: email_gmail,
                        pass: pass_gmail,
                      },
                      secure: true,
                    });

                    transport
                      .sendMail(getTemplateEmailPembayaran(email_reservasi))
                      .then(() => {
                        console.log("success");
                        res.json({ message: "success payment" });
                      })
                      .catch(() => {
                        res.json({
                          message: "ERROR",
                        });
                      });
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

// app.post("/update-payment", (req, res) => {
//   const { external_id, account_number, expected_amount, bank_code } = req.body;
// });

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
  connection.query(
    `select reservasi.* , payment.status as p_status from reservasi left join payment on reservasi.id = payment.id_reservasi;`,
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
  const { status, parts, price } = req.body;

  if (status === "process") {
    connection.query(
      `UPDATE reservasi set status = 'PROCESS' where id = ${id}`,
      (err, results) => {
        if (err) {
          res.json({ message: "error" });
        } else {
          res.json({
            message: "success",
          });
        }
      }
    );
  } else {
    let stringSQL = "INSERT INTO item_part(id_reservasi,part,qty,price) Values";
    parts.forEach((item, index) => {
      stringSQL += `(${id},'${item.part}',${item.qty},${item.price})${
        parts.length !== index + 1 ? "," : ""
      }`;
    });

    connection.query(stringSQL, (err, results) => {
      if (err) {
        res.json({ message: "error" });
      }
      if (results) {
        connection.query(
          `UPDATE reservasi set status = 'DONE' , amount = ${price} where id = ${id}`,
          (errUpdate, results) => {
            if (errUpdate) {
              res.json({ message: "error" });
            } else {
              connection.query(
                `insert into payment(id_reservasi,status,price) values(${id},'WAITING',${price})`,
                (errP, responseP) => {
                  if (errP) {
                    res.json({ message: "error disni" });
                  } else {
                    res.json({
                      message: "success",
                    });
                  }
                }
              );
            }
          }
        );
      }
    });
  }
});

app.listen(4000, () => {
  console.log("server running");
});
