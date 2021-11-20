create database backend_exercise;
use backend_exercise;

-- create a table
create TABLE productos (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title TEXT NOT NULL,
  price INTEGER NOT NULL,
  thumbnail TEXT NOT NULL
);

create TABLE mensajes (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  email TEXT NOT NULL,
  message_timestamp DATETIME NOT NULL,
  content TEXT NOT NULL
);