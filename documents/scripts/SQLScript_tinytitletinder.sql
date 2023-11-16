use tiny_title_tinder_database;

DELIMITER //
drop procedure if exists CreateUserWithRoleAndLocation;
CREATE PROCEDURE CreateUserWithRoleAndLocation(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_age INT,
    IN p_gender VARCHAR(10),
    IN p_first_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_location_id VARCHAR(255),
    IN p_city VARCHAR(255),
    IN p_zipcode VARCHAR(20),
    IN p_address VARCHAR(255)
)
BEGIN
    DECLARE p_user_id INT;
    DECLARE p_parent_id INT;
    DECLARE p_address_id INT;

    -- Create the user
    INSERT INTO user (email, password) VALUES (p_email, p_password);
    SELECT LAST_INSERT_ID() INTO p_user_id;

    insert into user_role (fk_user_id, fk_role_id) values (p_user_id, 3);

    -- Create the parent
    INSERT INTO parent (age, gender, first_name, last_name) VALUES (p_age, p_gender, p_first_name, p_last_name);
    SELECT LAST_INSERT_ID() INTO p_parent_id;

    -- Associate user with parent
    UPDATE user SET parentParentId = p_parent_id WHERE user_id = p_user_id;

    -- Create the address
    INSERT INTO address (city, zipcode, address, locationLocationId) VALUES (p_city, p_zipcode, p_address, p_location_id);
    SELECT LAST_INSERT_ID() INTO p_address_id;

    -- Associate location with parent
    update parent SET addressAddressId = p_address_id where parent_id = p_parent_id;

    -- Associate address with location
    update address SET locationLocationId = p_location_id where address_id = p_address_id;
    SELECT * from user where user_id = p_user_id;
END //

DELIMITER ;


DELIMITER //
drop procedure if exists getNamesByParentId;
CREATE PROCEDURE getNamesByParentId(
IN parentId int
)
BEGIN

SELECT ns.*, o.*, m.*
FROM parent_name_suggest pns
JOIN name_suggest ns ON ns.name_suggest_id = pns.fk_name_suggest_id
JOIN name_suggest_origin nso ON ns.name_suggest_id = nso.fk_name_suggest_id
JOIN origin o ON o.origin_id = nso.fk_origin_id
JOIN name_suggest_meaning nsm ON ns.name_suggest_id = nsm.fk_name_suggest_id
JOIN meaning m ON m.meaning_id = nsm.fk_meaning_id
WHERE pns.fk_parent_id = parentId;
END //

DELIMITER ;
