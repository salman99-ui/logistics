const table =
  "CREATE TABLE payment(id INT NOT NULL AUTO_INCREMENT , id_reservasi INT, external_id VARCHAR(255), va VARCHAR(255) , bank_code VARCHAR(255) , status ENUM('WAITING','DONE') , price INT , primary key(id))";
