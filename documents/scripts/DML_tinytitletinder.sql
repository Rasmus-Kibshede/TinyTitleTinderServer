USE tiny_title_tinder_database;

INSERT INTO definition (meaning) VALUES
('John is a masculine name of Hebrew origin, derived from "Yohannan," meaning "God is gracious."'),
('Beloved'),
('Free man, valiant'),
('Lofty');

INSERT INTO origin (region, religion, description, fk_definition_id) VALUES
('United States', 'Christianity', 'The land of the free and school shootings', 1),
('India', 'Hinduism', 'Budda checkin', 2),
('Brazil', 'Catholicism', 'Pendejo', 3),
('China', 'Buddhism', 'The religion of China should be Taoism, not buddhism. Taiwan # 1', 4);

INSERT INTO name_suggest (name_suggest_name, gender, popularity, name_days, namesakes) VALUES
('John', 'Male', 0.85, '01-01-2023', 'John F. Kennedy'),
('Priya', 'Female', 0.92, '01-01-2023', 'Priyanka Chopra'),
('Carlos', 'Male', 0.78, '01-01-2023', 'Carlos Santana'),
('Wei', 'Male', 0.67, '01-01-2023', 'Wei Jingsheng'),
('Hans', 'Male', 0.31, '01-01-2023', 'Hans Pilgaard'),
('Hansi', 'Male', 0.31, '01-01-2023', 'Hans Pilgaard'),
('Margot', 'Female', 0.14, '01-01-2023', 'Margot Robbie'),
('Maria', 'Female', 0.73, '01-01-2023', 'Maria Bello');

INSERT INTO location (country) VALUES
('United States'),
('India'),
('Brazil'),
('China');

INSERT INTO address (city, zipcode, street, fk_location_id) VALUES
('New York', '10001', '123 Main St', 1),
('Mumbai', '400001', '456 Elm St', 2),
('Rio de Janeiro', '20000', '789 Oak St', 3),
('Beijing', '100000', '101 Pine St', 4);

INSERT INTO parent (age, gender, first_name, last_name, fk_address_id) VALUES
(35, 'Male', 'John', 'Smith',1),
(30, 'Female', 'Priya', 'Patel',2),
(40, 'Male', 'Carlos', 'Silva',3),
(32, 'Male', 'Wei', 'Wang',4);

INSERT INTO user (email, password, user_active, created_at, last_login, fk_parent_id) VALUES
('user1@example.com', '$2b$10$7cCi2z1vHM/./DHuK0TpWejNnFaNOJ5ZrXbIMfilP4gyBW1fA/xJm', 1, '2012-11-05 14:29:36', NOW() - INTERVAL 1 YEAR, 1),
('user2@example.com', '$2b$10$7cCi2z1vHM/./DHuK0TpWejNnFaNOJ5ZrXbIMfilP4gyBW1fA/xJm', 1, '2016-11-05 14:29:36', NOW() - INTERVAL 1 MONTH, 2),
('user3@example.com', '$2b$10$7cCi2z1vHM/./DHuK0TpWejNnFaNOJ5ZrXbIMfilP4gyBW1fA/xJm', 1, '2012-11-05 14:29:36', NOW() - INTERVAL 1 WEEK, 3),
('user4@example.com', '$2b$10$7cCi2z1vHM/./DHuK0TpWejNnFaNOJ5ZrXbIMfilP4gyBW1fA/xJm', 1, '2019-11-05 14:29:36', NOW() - INTERVAL 1 DAY, 4);

INSERT INTO role (title) VALUES
('Super Admin'),
('Admin'),
('User');

INSERT INTO user_role (fk_user_id, fk_role_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 1);

INSERT INTO family (family_name) VALUES
('Smith'),
('Patel'),
('Silva'),
('Wang');

insert into family_parent(fk_family_id, fk_parent_id) values
(1, 1),
(2,2),
(3,3),
(4,4);

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
