CREATE USER 'stef'@'%' IDENTIFIED BY 'pass';
CREATE DATABASE IF NOT EXISTS UAC;
USE UAC;
CREATE TABLE IF NOT EXISTS users (
    id INT(255) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);
GRANT select, update, insert, delete ON users to 'stef'@'%';