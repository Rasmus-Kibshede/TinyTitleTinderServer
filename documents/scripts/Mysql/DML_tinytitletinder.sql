USE tinytitletinder;

INSERT INTO definition (meaning) VALUES
('John is a masculine name of Hebrew origin, derived from "Yohannan," meaning "God is gracious."'),
('Beloved'),
('Free man, valiant'),
('Lofty'),
('Named after John F. Kennedy'),
('Named after Priyanka Chopra'),
('Named after Carlos Santana'),
('Named after Wei Jingsheng'),
('Named after Hans Pilgaard'),
('Named after Margot Robbie'),
('Named after Maria Bello'),
('Named after Zane Grey'),
('Named after Zara Larsson');

insert into origin (region, religion, description, fk_definition_id)
values
    ('North America', 'Christianity', 'Named after John F. Kennedy', 1),
    ('India', 'Hinduism', 'Named after Priyanka Chopra', 2),
    ('South America', 'Christianity', 'Named after Carlos Santana', 3),
    ('China', 'Buddhism', 'Named after Wei Jingsheng', 4),
    ('Europe', 'Christianity', 'Named after Hans Pilgaard', 5),
    ('Australia', 'Christianity', 'Named after Margot Robbie', 6),
    ('North America', 'Christianity', 'Named after Maria Bello', 7),
    ('United States', 'Christianity', 'Named after Zane Grey', 8),
    ('Sweden', 'Christianity', 'Named after Zara Larsson', 9);

INSERT INTO name_suggest (name_suggest_name, gender, popularity, name_days, namesakes) VALUES
('John', 'Male', 0.85, '01-01-2023', 'John F. Kennedy'),
('Priya', 'Female', 0.92, '01-01-2023', 'Priyanka Chopra'),
('Carlos', 'Male', 0.78, '01-01-2023', 'Carlos Santana'),
('Wei', 'Male', 0.67, '01-01-2023', 'Wei Jingsheng'),
('Hans', 'Male', 0.31, '01-01-2023', 'Hans Pilgaard'),
('Hansi', 'Male', 0.31, '01-01-2023', 'Hans Pilgaard'),
('Margot', 'Female', 0.14, '01-01-2023', 'Margot Robbie'),
('Maria', 'Female', 0.73, '01-01-2023', 'Maria Bello'),
('Zane', 'Male', 0.42, '01-01-2023', 'Zane Grey'),
('Zara', 'Female', 0.67, '01-01-2023', 'Zara Larsson'),
('Alice', 'Female', 0.95, '01-01-2023', 'Alice Walker'),
('Bob', 'Male', 0.88, '01-01-2023', 'Bob Marley'),
('Elena', 'Female', 0.75, '01-01-2023', 'Elena Kagan'),
('Oliver', 'Male', 0.89, '01-01-2023', 'Oliver Twist'),
('Olivia', 'Female', 0.93, '01-01-2023', 'Olivia Wilde'),
('Samuel', 'Male', 0.76, '01-01-2023', 'Samuel L. Jackson'),
('Samantha', 'Female', 0.82, '01-01-2023', 'Samantha Smith'),
('Isaac', 'Male', 0.68, '01-01-2023', 'Isaac Newton'),
('Isabella', 'Female', 0.91, '01-01-2023', 'Isabella Rossellini'),
('Nathan', 'Male', 0.77, '01-01-2023', 'Nathan Hale'),
('Natalie', 'Female', 0.84, '01-01-2023', 'Natalie Portman'),
('Elijah', 'Male', 0.79, '01-01-2023', 'Elijah Wood'),
('Eva', 'Female', 0.71, '01-01-2023', 'Eva Mendes'),
('Oscar', 'Male', 0.65, '01-01-2023', 'Oscar Wilde'),
('Octavia', 'Female', 0.63, '01-01-2023', 'Octavia Butler'),
('Victor', 'Male', 0.74, '01-01-2023', 'Victor Hugo'),
('Victoria', 'Female', 0.88, '01-01-2023', 'Victoria Beckham'),
('Leo', 'Male', 0.82, '01-01-2023', 'Leonardo DiCaprio'),
('Leah', 'Female', 0.76, '01-01-2023', 'Leah Remini'),
('Xavier', 'Male', 0.47, '01-01-2023', 'Xavier Naidoo'),
('Xena', 'Female', 0.59, '01-01-2023', 'Xena: Warrior Princess'),
('Quincy', 'Male', 0.61, '01-01-2023', 'Quincy Jones'),
('Quinn', 'Female', 0.55, '01-01-2023', 'Quinn Shephard'),
('Jordan', 'Unisex', 0.78, '01-01-2023', 'Michael Jordan'),
('Taylor', 'Unisex', 0.81, '01-01-2023', 'Taylor Swift'),
('Alex', 'Unisex', 0.75, '01-01-2023', 'Alex Rodriguez'),
('Casey', 'Unisex', 0.69, '01-01-2023', 'Casey Affleck'),
('Cameron', 'Unisex', 0.68, '01-01-2023', 'Cameron Diaz'),
('Riley', 'Unisex', 0.76, '01-01-2023', 'Riley Keough'),
('Morgan', 'Unisex', 0.73, '01-01-2023', 'Morgan Freeman'),
('Avery', 'Unisex', 0.79, '01-01-2023', 'Avery Brooks'),
('Charlie', 'Unisex', 0.85, '01-01-2023', 'Charlie Chaplin'),
('Alexis', 'Unisex', 0.77, '01-01-2023', 'Alexis Bledel'),
('Blake', 'Unisex', 0.82, '01-01-2023', 'Blake Lively'),
('Dakota', 'Unisex', 0.74, '01-01-2023', 'Dakota Fanning'),
('Jamie', 'Unisex', 0.80, '01-01-2023', 'Jamie Foxx');

INSERT INTO location (country) VALUES
('United Kingdom'),
('Canada'),
('Australia'),
('Germany'),
('France'),
('Japan'),
('South Korea'),
('Mexico'),
('Russia'),
('Italy'),
('Denmark');

INSERT INTO address (city, zipcode, street, fk_location_id) VALUES
('New York', '10001', '123 Main St', 1),
('Mumbai', '400001', '456 Elm St', 2),
('Rio de Janeiro', '20000', '789 Oak St', 3),
('Beijing', '100000', '101 Pine St', 4);

INSERT INTO parent (age, gender, first_name, last_name, fk_address_id) VALUES
(28, 'Female', 'Emily', 'Taylor', 1),
(33, 'Male', 'Christopher', 'Brown', 2),
(37, 'Female', 'Sophia', 'Miller', 3),
(31, 'Female', 'Jessica', 'Davis', 4);

INSERT INTO user (email, password, user_active, created_at, last_login, fk_parent_id) VALUES
('emily.taylor@example.com', '$2b$10$7cCi2z1vHM/./DHuK0TpWejNnFaNOJ5ZrXbIMfilP4gyBW1fA/xJm', 1, '2012-11-05 14:29:36', NOW() - INTERVAL 1 YEAR, 1),
('christopher.brown@example.com', '$2b$10$7cCi2z1vHM/./DHuK0TpWejNnFaNOJ5ZrXbIMfilP4gyBW1fA/xJm', 1, '2016-11-05 14:29:36', NOW() - INTERVAL 1 MONTH, 2),
('sophia.miller@example.com', '$2b$10$7cCi2z1vHM/./DHuK0TpWejNnFaNOJ5ZrXbIMfilP4gyBW1fA/xJm', 1, '2012-11-05 14:29:36', NOW() - INTERVAL 1 WEEK, 3),
('jessica.davis@example.com', '$2b$10$7cCi2z1vHM/./DHuK0TpWejNnFaNOJ5ZrXbIMfilP4gyBW1fA/xJm', 1, '2019-11-05 14:29:36', NOW() - INTERVAL 1 DAY, 4);

INSERT INTO role (title) VALUES
('Super Admin'),
('Admin'),
('User');

INSERT INTO user_role (fk_user_id, fk_role_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 3);

INSERT INTO family (family_name) VALUES
('Taylor'),
('Miller');

insert into family_parent(fk_family_id, fk_parent_id) values
(1, 1),
(1,2),
(2,3),
(2,4);

insert into name_suggest_origin (fk_name_suggest_id, fk_origin_id)
values
     (1, 1),
    (3, 2),
    (4, 3),
    (5, 4),
    (6, 4),
    (8, 5),
    (9, 6),
    (11, 7),
    (13, 8),
    (15, 9),
    (17, 1),
    (19, 2),
    (21, 3),
    (23, 4),
    (27, 5),
    (29, 6),
    (2, 7),
    (7, 8),
    (10, 9),
    (12, 1),
    (14, 2),
    (16, 3),
    (18, 4),
    (20, 5),
    (22, 6),
    (24, 7),
    (26, 8),
    (28, 9),
    (30, 1),
    (32, 2),
    (34, 3),
    (36, 4),
    (38, 5),
    (31, 6),
    (33, 7),
    (35, 8),
    (37, 9),
    (39, 1),
    (41, 2),
    (43, 3),
    (45, 4);

INSERT INTO parent_name_suggest (fk_parent_id, fk_name_suggest_id) VALUES
(1, 2),
(2, 3),
(3, 4),
(3, 2),
(3, 1),
(1, 4),
(4, 1);
