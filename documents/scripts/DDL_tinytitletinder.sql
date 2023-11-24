DROP DATABASE IF EXISTS tiny_title_tinder_database;
CREATE DATABASE tiny_title_tinder_database;
USE tiny_title_tinder_database;

CREATE TABLE origin (
  origin_id int NOT NULL AUTO_INCREMENT,
  region varchar(255),
  religion varchar(255),
  description text,
  PRIMARY KEY (origin_id)
);

CREATE TABLE definition (
  definition_id int NOT NULL AUTO_INCREMENT,
  meaning text,
  PRIMARY KEY (definition_id)
);

CREATE TABLE name_suggest (
  name_suggest_id int NOT NULL AUTO_INCREMENT,
  name_suggest_name varchar(255),
  gender varchar(255),
  popularity int,
  name_days date,
  namesakes varchar(255),
  PRIMARY KEY (name_suggest_id)
);

CREATE TABLE name_suggest_definition (
  fk_definition_id int NOT NULL AUTO_INCREMENT,
  fk_name_suggest_id int NOT NULL,
  FOREIGN KEY (fk_name_suggest_id) REFERENCES name_suggest(name_suggest_id),
  FOREIGN KEY (fk_definition_id) REFERENCES definition(definition_id)
);

CREATE TABLE user (
  user_id int NOT NULL AUTO_INCREMENT,
  email varchar(255),
  password varchar(255),
  user_active tinyint,
  created_at datetime,
  last_login datetime,
  PRIMARY KEY (user_id)
);

CREATE TABLE user_role (
  fk_user_id int NOT NULL ,
  fk_role_id int NOT NULL
);

CREATE TABLE address (
  address_id int NOT NULL AUTO_INCREMENT,
  city varchar(255),
  zipcode varchar(255),
  address varchar(255),
  PRIMARY KEY (address_id)
);

CREATE TABLE location (
  location_id int NOT NULL AUTO_INCREMENT,
  country varchar(255),
  fk_address_id int,
  PRIMARY KEY (location_id),
  FOREIGN KEY (fk_address_id) REFERENCES address(address_id),
  KEY Fk (fk_address_id)
);
CREATE TABLE family (
  family_id int NOT NULL AUTO_INCREMENT,
  family_name varchar(255),
  PRIMARY KEY (family_id)
);

CREATE TABLE invite (
  invite_id int NOT NULL AUTO_INCREMENT,
  invite_status tinyint,
  fk_family_id int,
  PRIMARY KEY (invite_id),
  FOREIGN KEY (fk_family_id) REFERENCES family(family_id)
);

CREATE TABLE parent (
  parent_id int NOT NULL AUTO_INCREMENT,
  age int,
  gender varchar(255),
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  fk_user_id int NOT NULL,
  fk_location_id int NOT NULL,
  fk_invite_id int NOT NULL ,
  FOREIGN KEY (fk_user_id) REFERENCES user(user_id),
  FOREIGN KEY (fk_location_id) REFERENCES location(location_id),
  FOREIGN KEY (fk_invite_id) REFERENCES invite(invite_id),
  PRIMARY KEY (parent_id)
);

CREATE TABLE role (
  role_id int NOT NULL AUTO_INCREMENT,
  role varchar(255),
  PRIMARY KEY (role_id)
);

CREATE TABLE name_suggest_origin (
  fk_name_suggest_id int NOT NULL,
  fk_origin_id int NOT NULL,
  FOREIGN KEY (fk_name_suggest_id) REFERENCES name_suggest(name_suggest_id),
  FOREIGN KEY (fk_origin_id) REFERENCES origin(origin_id)
);

CREATE TABLE parent_name_suggest (
  fk_parent_id int NOT NULL ,
  fk_name_suggest_id int NOT NULL ,
  FOREIGN KEY (fk_parent_id) REFERENCES parent(parent_id),
  FOREIGN KEY (fk_name_suggest_id) REFERENCES name_suggest(name_suggest_id)
);

#---------------------------------------------------------Audit tables---------------------------------------------------------
DROP TABLE IF EXISTS adt_name;
-- Table for logging actions on name_suggest table
CREATE TABLE adt_name
(
    adt_name_id    INT AUTO_INCREMENT PRIMARY KEY,
    name_id        INT,
    name           VARCHAR(255) NOT NULL,
    action_type    VARCHAR(100) NOT NULL,
    date_of_action DATETIME     NOT NULL
);

DROP TABLE IF EXISTS adt_updated_name;
-- Table for logging updates on name_suggest table
CREATE TABLE adt_updated_name
(
    adt_updated_name_id INT AUTO_INCREMENT PRIMARY KEY,
    name_id             INT,
    new_name            VARCHAR(255) NOT NULL,
    old_name            VARCHAR(255) NOT NULL,
    action_type         VARCHAR(100) NOT NULL,
    date_of_action      DATETIME     NOT NULL
);

DROP TABLE IF EXISTS adt_user;
-- Table for logging actions on user table
CREATE TABLE adt_user
(
    adt_user_id    INT AUTO_INCREMENT PRIMARY KEY,
    user_id        INT,
    email          VARCHAR(255),
    user_active    TINYINT,
    last_login     VARCHAR(255),
    action_type    VARCHAR(100) NOT NULL,
    date_of_action DATETIME     NOT NULL
);


#---------------------------------------------------------Stored procedures---------------------------------------------------------

DROP PROCEDURE IF EXISTS get_parent_like;
DELIMITER $$
CREATE PROCEDURE get_parent_like()
BEGIN
    SELECT parent_id, CONCAT(first_name, ' ', last_name) as full_name, name_suggest_name FROM parent JOIN parent_name_suggest pn on parent.parent_id = pn.fk_parent_id JOIN name_suggest n on pn.fk_name_suggest_id = n.name_suggest_id ORDER BY parent_id ASC;
END $$

#---------------------------------------------------------Functions---------------------------------------------------------

DROP FUNCTION IF EXISTS get_liked_names;
DELIMITER $$
CREATE FUNCTION get_liked_names(parent_id int) RETURNS INT DETERMINISTIC
BEGIN
    DECLARE number_liked_names INT DEFAULT 0;
    SELECT COUNT(*) FROM parent JOIN parent_name_suggest pn on parent.parent_id = pn.fk_parent_id JOIN name_suggest n on pn.fk_name_suggest_id = n.name_suggest_id WHERE parent.parent_id = parent_id INTO number_liked_names;
    return number_liked_names;
END $$
DELIMITER ;

DROP FUNCTION IF EXISTS get_name_likes;
DELIMITER $$
CREATE FUNCTION get_name_likes(name_id int) RETURNS INT DETERMINISTIC
BEGIN
    DECLARE number_liked_names INT DEFAULT 0;
    SELECT COUNT(*) FROM name_suggest JOIN parent_name_suggest on name_suggest.name_suggest_id = parent_name_suggest.fk_name_suggest_id WHERE fk_name_suggest_id = name_id INTO number_liked_names;
    return number_liked_names;
END $$
DELIMITER ;


#---------------------------------------------------------Views---------------------------------------------------------

CREATE or replace VIEW NameData AS
SELECT
    n.name_suggest_id,
    n.name_suggest_name,
    n.gender,
    n.popularity,
    n.name_days,
    n.namesakes,
    o.description,
    o.region,
    o.religion,
    m.definition

FROM
    name_suggest n
JOIN
    name_suggest_origin no ON n.name_suggest_id = no.fk_name_suggest_id
JOIN
    origin o ON no.fk_origin_id = o.origin_id
JOIN
    name_suggest_definition nm ON n.name_suggest_id = nm.fk_name_suggest_id
JOIN
    definition m ON nm.fk_name_suggest_id = m.definition_id;


CREATE or replace VIEW UserAddress AS
SELECT
    p.parent_id,
    p.age,
    p.gender,
    CONCAT(first_name, ' ', last_name) AS full_name,
    l.country,
    a.city,
    a.zipcode,
    a.address
FROM
    parent p
JOIN
    location l ON p.fk_location_id = l.location_id
JOIN
    address a ON l.fk_address_id = a.address_id;

#---------------------------------------------------------Triggers---------------------------------------------------------

DROP TRIGGER IF EXISTS nameAuditDeletionTrigger;
-- Logs name deletions
DELIMITER //
CREATE TRIGGER nameAuditDeletionTrigger
    AFTER DELETE
    ON name_suggest
    FOR EACH ROW
BEGIN
    INSERT INTO adt_name(name_id, name, action_type, date_of_action)
    VALUES (OLD.name_suggest_id, OLD.name_suggest_name, 'delete', NOW());
END//

DROP TRIGGER IF EXISTS nameAuditUpdateTrigger;
-- Logs name updates
DELIMITER //
CREATE TRIGGER nameAuditUpdateTrigger
    AFTER UPDATE
    ON name_suggest
    FOR EACH ROW
BEGIN
    INSERT INTO adt_updated_name(name_id, new_name, old_name, action_type, date_of_action)
    VALUES (NEW.name_suggest_id, NEW.name_suggest_name, OLD.name_suggest_name, 'update', NOW());
END//

DROP TRIGGER IF EXISTS nameAuditInsertTrigger;
-- Logs name insertions
DELIMITER //
CREATE TRIGGER nameAuditInsertTrigger
    AFTER INSERT
    ON name_suggest
    FOR EACH ROW
BEGIN
    INSERT INTO adt_name(name_id, name, action_type, date_of_action)
    VALUES (NEW.name_suggest_id, NEW.name_suggest_name, 'insert', NOW());
END//

DROP TRIGGER IF EXISTS userDeletionAuditTrigger;
-- Logs user deletion
DELIMITER //
CREATE TRIGGER userDeletionAuditTrigger
    AFTER DELETE
    ON user
    FOR EACH ROW
BEGIN
    INSERT INTO adt_user(user_id, email, user_active, last_login, action_type, date_of_action)
    VALUES (OLD.user_id, OLD.email, OLD.user_active, OLD.last_login, 'delete', NOW());
END //

DROP TRIGGER IF EXISTS userActiveAuditTrigger;
-- Logs user_active being changed
DELIMITER //
CREATE TRIGGER userActiveAuditTrigger
    AFTER UPDATE
    ON user
    FOR EACH ROW
BEGIN
    DECLARE action_type VARCHAR(20);
    -- Checks if user_active has changed
    IF NEW.user_active <> OLD.user_active THEN
        IF NEW.user_active = 1 THEN
            SET action_type = 'set to active';
        ELSE
            SET action_type = 'set to inactive';
        END IF;
        INSERT INTO adt_user(user_id, email, user_active, last_login, action_type, date_of_action)
        VALUES (NEW.user_id, NEW.email, NEW.user_active, NEW.last_login, action_type, NOW());
    END IF;
END //
DELIMITER ;

#---------------------------------------------------------Events---------------------------------------------------------

DROP EVENT IF EXISTS changeUserToInactive;
-- Change user_active to 0 after last login being over 1 year old
DELIMITER //
CREATE EVENT changeUserToInactive
    ON SCHEDULE
        EVERY 1 DAY STARTS CURRENT_TIMESTAMP
    DO BEGIN
    UPDATE user
    SET user_active = 0
    WHERE last_login < NOW() - INTERVAL 1 YEAR
      AND user_active = 1;
END //

DROP EVENT IF EXISTS changeUserToActive;
-- Change user_active to 1 after last login being under 1 year old
DELIMITER //
CREATE EVENT changeUserToActive
    ON SCHEDULE
        EVERY 1 DAY STARTS CURRENT_TIMESTAMP
    DO BEGIN
    UPDATE user
    SET user_active = 1
    WHERE last_login > NOW() - INTERVAL 1 YEAR
      AND user_active = 0;
END //
