const table = "create table user( id int not null AUTO_INCREMENT , nama VARCHAR(255) NOT NULL , email VARCHAR(255) NOT NULL , role int NOT NULL , password varchar(255) , PRIMARY KEY (id))"

// admin 
const admin = "insert into user (nama,email,role,password) values('admin','admin@bengkel.com',1,'coba1234')"

// user 
const user = "insert into user (nama,email,role,password) values('user','user@gmail.com',2,'coba1234')"