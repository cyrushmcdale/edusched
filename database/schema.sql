-- EduSched minimal schema for login demo
CREATE DATABASE IF NOT EXISTS edusched;
USE edusched;

CREATE TABLE IF NOT EXISTS Admin (
  admin_id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Student (
  student_id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  course VARCHAR(100),
  year INT,
  status BOOLEAN DEFAULT TRUE
);

-- Other tables from ERD can be added later.
