USE tiny_title_tinder_database;

INSERT INTO origin (region, religion) VALUES
('United States', 'Christianity'),
('India', 'Hinduism'),
('Brazil', 'Catholicism'),
('China', 'Buddhism');

INSERT INTO definition (meaning) VALUES
('The name "John" is of male gender and has a popularity score of 0.85. It is associated with the nameday of June 24 and has notable namesakes such as John F. Kennedy. It also has related names like Jonathan and Jack.'),
('The name "Priya" is of female gender and has a popularity score of 0.92. It is associated with the nameday of March 15 and has notable namesakes such as Priyanka Chopra. It also has related names like Pria and Priyanka.'),
('The name "Carlos" is of male gender and has a popularity score of 0.78. It is associated with the nameday of November 4 and has notable namesakes such as Carlos Santana. It also has related names like Carlo and Carlito.'),
('The name "Wei" is of male gender and has a popularity score of 0.67. It is associated with the nameday of September 12 and has notable namesakes such as Wei Jingsheng. It also has related names like Wey and Wayne.');

INSERT INTO name_suggest (name_suggest_name, gender, popularity, name_days, namesakes) VALUES
('John', 'Male', 0.85, '2000-01-09', 'John F. Kennedy'),
('Priya', 'Female', 0.92, '2000-02-08', 'Priyanka Chopra'),
('Carlos', 'Male', 0.78, '2000-03-07', 'Carlos Santana'),
('Wei', 'Male', 0.67, '2000-04-06', 'Wei Jingsheng'),
('Hans', 'Male', 0.31, '2000-05-05', 'Hans Pilgaard'),
('Hansi', 'Male', 0.31, '2000-06-04', 'Hans Pilgaard'),
('Margot', 'Female', 0.14, '2000-07-03', 'Margot Robbie'),
('Maria', 'Female', 0.73, '2000-08-02', 'Maria Bello');

INSERT INTO name_suggest_definition (fk_name_suggest_id, fk_definition_id) VALUES
(1, 2),
(2, 3),
(3, 4),
(4, 1);

INSERT INTO user (email, password, user_active, created_at, last_login) VALUES
('user1@example.com', 'password1', 1, '2012-11-05 14:29:36', '2012-12-05 14:29:36'),
('user2@example.com', 'password2', 1, '2016-11-05 14:29:36', '2016-12-05 14:29:36'),
('user3@example.com', 'password3', 1, '2012-11-05 14:29:36', '2012-12-05 14:29:36'),
('user4@example.com', 'password4', 1, '2019-11-05 14:29:36', '2019-12-05 14:29:36');

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

INSERT INTO location (country, fk_address_id) VALUES
('United States', 1),
('India', 2),
('Brazil', 3),
('China', 4);

INSERT INTO family (family_name) VALUES
('Smith'),
('Patel'),
('Silva'),
('Wang');

INSERT INTO invite (invite_status, fk_family_id) VALUES
(1, 1),
(0, 2),
(1, 3),
(0, 4);

INSERT INTO parent (age, gender, first_name, last_name, fk_user_id, fk_location_id, fk_invite_id) VALUES
(35, 'Male', 'John', 'Smith', 1, 1, 1),
(30, 'Female', 'Priya', 'Patel', 2, 2, 2),
(40, 'Male', 'Carlos', 'Silva', 3, 3, 3),
(32, 'Male', 'Wei', 'Wang', 4, 4, 4);

INSERT INTO role (role) VALUES
('Super Admin'),
('Admin'),
('User');

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