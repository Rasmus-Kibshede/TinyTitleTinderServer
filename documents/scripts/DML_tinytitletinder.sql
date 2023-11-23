USE tiny_title_tinder_database;

INSERT INTO origin (region, religion, description) VALUES
('United States', 'Christianity', 'The land of the free and school shootings'),
('India', 'Hinduism', 'Budda checkin'),
('Brazil', 'Catholicism', 'Pendejo'),
('China', 'Buddhism', 'The religion of China should be Taoism, not buddhism. Taiwan # 1');

INSERT INTO definition (meaning) VALUES
('The name "John" is of male gender and has a popularity score of 0.85. It is associated with the nameday of June 24 and has notable namesakes such as John F. Kennedy. It also has related names like Jonathan and Jack.'),
('The name "Priya" is of female gender and has a popularity score of 0.92. It is associated with the nameday of March 15 and has notable namesakes such as Priyanka Chopra. It also has related names like Pria and Priyanka.'),
('The name "Carlos" is of male gender and has a popularity score of 0.78. It is associated with the nameday of November 4 and has notable namesakes such as Carlos Santana. It also has related names like Carlo and Carlito.'),
('The name "Wei" is of male gender and has a popularity score of 0.67. It is associated with the nameday of September 12 and has notable namesakes such as Wei Jingsheng. It also has related names like Wey and Wayne.');

INSERT INTO name_suggest (name_suggest_name, gender, popularity, name_days, namesakes) VALUES
('John', 'Male', 0.85, '01-01-2023', 'John F. Kennedy'),
('Priya', 'Female', 0.92, '01-01-2023', 'Priyanka Chopra'),
('Carlos', 'Male', 0.78, '01-01-2023', 'Carlos Santana'),
('Wei', 'Male', 0.67, '01-01-2023', 'Wei Jingsheng'),
('Hans', 'Male', 0.31, '01-01-2023', 'Hans Pilgaard'),
('Hansi', 'Male', 0.31, '01-01-2023', 'Hans Pilgaard'),
('Margot', 'Female', 0.14, '01-01-2023', 'Margot Robbie'),
('Maria', 'Female', 0.73, '01-01-2023', 'Maria Bello');

INSERT INTO user (email, password, user_active, created_at, last_login) VALUES
('user1@example.com', 'password1', 1, '2012-11-05 14:29:36', NOW() - INTERVAL 1 YEAR),
('user2@example.com', 'password2', 1, '2016-11-05 14:29:36', NOW() - INTERVAL 1 MONTH),
('user3@example.com', 'password3', 1, '2012-11-05 14:29:36', NOW() - INTERVAL 1 WEEK),
('user4@example.com', 'password4', 1, '2019-11-05 14:29:36', NOW() - INTERVAL 1 DAY);

INSERT INTO role (title) VALUES
('Super Admin'),
('Admin'),
('User');

INSERT INTO user_role (fk_user_id, fk_role_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 1);

INSERT INTO address (city, zipcode, address) VALUES
('New York', '10001', '123 Main St'),
('Mumbai', '400001', '456 Elm St'),
('Rio de Janeiro', '20000', '789 Oak St'),
('Beijing', '100000', '101 Pine St');

INSERT INTO location (country) VALUES
('United States'),
('India'),
('Brazil'),
('China');

INSERT INTO family (family_name) VALUES
('Smith'),
('Patel'),
('Silva'),
('Wang');

INSERT INTO parent (age, gender, first_name, last_name) VALUES
(35, 'Male', 'John', 'Smith'),
(30, 'Female', 'Priya', 'Patel'),
(40, 'Male', 'Carlos', 'Silva'),
(32, 'Male', 'Wei', 'Wang');

INSERT INTO name_suggest_origin (fk_name_suggest_id, fk_origin_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

INSERT INTO parent_name_suggest (fk_parent_id, fk_name_suggest_id) VALUES
(1, 2),
(2, 3),
(3, 4),
(3, 2),
(3, 1),
(1, 4),
(4, 1);
