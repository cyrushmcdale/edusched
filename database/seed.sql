USE edusched;

-- Passwords are bcrypt hashes of 'password123'
INSERT INTO Admin (admin_id, name, email, password) VALUES
(1, 'System Admin', 'admin@unp.edu', '$2b$10$Co5F7TlzO3cEZRuvy.yTY.25/yAW6tOOpWReEE69NYCZpzipcuexu');

INSERT INTO Student (student_id, name, email, password, course, year, status) VALUES
(12345, 'Juan Dela Cruz', 'juan@unp.edu', '$2b$10$Co5F7TlzO3cEZRuvy.yTY.25/yAW6tOOpWReEE69NYCZpzipcuexu', 'BSCS', 2, TRUE);
