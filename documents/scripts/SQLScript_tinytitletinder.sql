use tiny_title_tinder_database;
/*---------------------END PRODUCT-----------------------------------------------------------------------------------*/
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

    -- Create user
    INSERT INTO user (email, password) VALUES (p_email, p_password);
    SELECT LAST_INSERT_ID() INTO p_user_id;

    insert into user_role (fk_user_id, fk_role_id) values (p_user_id, 3);

    -- Create parent
    INSERT INTO parent (age, gender, first_name, last_name) VALUES (p_age, p_gender, p_first_name, p_last_name);
    SELECT LAST_INSERT_ID() INTO p_parent_id;

    -- Relation: user with parent
    UPDATE user SET fk_parent_id = p_parent_id WHERE user_id = p_user_id;

    -- Create address
    INSERT INTO address (city, zipcode, street, fk_location_id) VALUES (p_city, p_zipcode, p_address, p_location_id);
    SELECT LAST_INSERT_ID() INTO p_address_id;

    -- Relation: location with parent
    update parent SET fk_address_id = p_address_id where parent_id = p_parent_id;

    -- Relation: address with location
    update address SET fk_location_id = p_location_id where address_id = p_address_id;
END //

DELIMITER ;
/*---------------------END PRODUCT-----------------------------------------------------------------------------------*/
DELIMITER //
DROP PROCEDURE IF EXISTS GetDislikedNamesOriginsDefinitionsByParentId;
CREATE PROCEDURE GetDislikedNamesOriginsDefinitionsByParentId(IN parentId INT)
BEGIN
  -- Names: stored in temporary table
  CREATE TEMPORARY TABLE TempNames AS
    SELECT
      ns.name_suggest_id,
      ns.name_suggest_name,
      ns.gender,
      ns.popularity,
      ns.name_days,
      ns.namesakes
    FROM
      parent_name_suggest_dislike pns
    JOIN
      name_suggest ns ON ns.name_suggest_id = pns.fk_name_suggest_id
    WHERE
      pns.fk_parent_id = parentId;

  -- Origins: stored in temporary table
  CREATE TEMPORARY TABLE TempOrigins AS
    SELECT
      o.origin_id,
      o.region,
      o.religion,
      o.description,
      d.definition_id,
      d.meaning,
      nso.fk_name_suggest_id
    FROM
      name_suggest_origin nso
    JOIN
      origin o ON nso.fk_origin_id = o.origin_id
    JOIN
      definition d ON o.fk_definition_id = d.definition_id
    WHERE
      nso.fk_name_suggest_id IN (SELECT parent_name_suggest_dislike.fk_name_suggest_id FROM parent_name_suggest_dislike WHERE fk_parent_id = parentId);

  -- Retrieve data from temporary tables
  SELECT  * FROM TempNames;
  SELECT  * FROM TempOrigins;

  -- Drop temporary tables
  DROP TEMPORARY TABLE IF EXISTS TempNames;
  DROP TEMPORARY TABLE IF EXISTS TempOrigins;
END //
DELIMITER ;

/*---------------------END PRODUCT-----------------------------------------------------------------------------------*/
DELIMITER //
DROP PROCEDURE IF EXISTS GetNamesOriginsDefinitionsByParentId;
CREATE PROCEDURE GetNamesOriginsDefinitionsByParentId(IN parentId INT)
BEGIN
  -- Names: stored in temporary table
  CREATE TEMPORARY TABLE TempNames AS
    SELECT
      ns.name_suggest_id,
      ns.name_suggest_name,
      ns.gender,
      ns.popularity,
      ns.name_days,
      ns.namesakes
    FROM
      parent_name_suggest pns
    JOIN
      name_suggest ns ON ns.name_suggest_id = pns.fk_name_suggest_id
    WHERE
      pns.fk_parent_id = parentId;

  -- Origins: stored in temporary table
  CREATE TEMPORARY TABLE TempOrigins AS
    SELECT
      o.origin_id,
      o.region,
      o.religion,
      o.description,
      d.definition_id,
      d.meaning,
      nso.fk_name_suggest_id
    FROM
      name_suggest_origin nso
    JOIN
      origin o ON nso.fk_origin_id = o.origin_id
    JOIN
      definition d ON o.fk_definition_id = d.definition_id
    WHERE
      nso.fk_name_suggest_id IN (SELECT parent_name_suggest.fk_name_suggest_id FROM parent_name_suggest WHERE fk_parent_id = parentId);

  -- Retrieve data from temporary tables
  SELECT  * FROM TempNames;
  SELECT  * FROM TempOrigins;

  -- Drop temporary tables
  DROP TEMPORARY TABLE IF EXISTS TempNames;
  DROP TEMPORARY TABLE IF EXISTS TempOrigins;
END //
DELIMITER ;
/*---------------------END PRODUCT-----------------------------------------------------------------------------------*/

DELIMITER //
DROP PROCEDURE IF EXISTS GetAllNamesLikedByFamily;
CREATE PROCEDURE GetAllNamesLikedByFamily(IN familyId INT)
BEGIN
  -- Names: stored in temporary table
  CREATE TEMPORARY TABLE TempNames AS
    SELECT
      ns.name_suggest_id,
      ns.name_suggest_name,
      ns.gender,
      ns.popularity,
      ns.name_days,
      ns.namesakes
    FROM
      parent_name_suggest pnl
    JOIN
      parent p ON pnl.fk_parent_id = p.parent_id
    JOIN
      name_suggest ns ON pnl.fk_name_suggest_id = ns.name_suggest_id
    WHERE
      pnl.fk_parent_id = familyId;

  -- Origins: stored in temporary table
CREATE TEMPORARY TABLE TempOrigins AS
  SELECT
    o.origin_id,
    o.region,
    o.religion,
    o.description,
    d.definition_id,
    d.meaning,
    nso.fk_name_suggest_id
  FROM
    name_suggest_origin nso
  JOIN
    origin o ON nso.fk_origin_id = o.origin_id
  JOIN
    definition d ON o.fk_definition_id = d.definition_id
  JOIN
    TempNames tn ON nso.fk_name_suggest_id = tn.name_suggest_id;


  -- Retrieve data from temporary tables
  SELECT  * FROM TempNames;
  SELECT  * FROM TempOrigins;

  -- Drop temporary tables
  DROP TEMPORARY TABLE IF EXISTS TempNames;
  DROP TEMPORARY TABLE IF EXISTS TempOrigins;
END //
DELIMITER ;

/*---------------------END PRODUCT-----------------------------------------------------------------------------------*/

DELIMITER //
DROP PROCEDURE IF EXISTS GetNamesWithNoParentRelation;
CREATE PROCEDURE GetNamesWithNoParentRelation(IN parentId INT)
BEGIN
  -- Names with no relations
  CREATE TEMPORARY TABLE TempNames AS
    SELECT
      ns.name_suggest_id,
      ns.name_suggest_name,
      ns.gender,
      ns.popularity,
      ns.name_days,
      ns.namesakes
    FROM
      name_suggest ns
    WHERE
      ns.name_suggest_id NOT IN (
        SELECT fk_name_suggest_id FROM parent_name_suggest WHERE fk_parent_id = parentId
        UNION
        SELECT fk_name_suggest_id FROM parent_name_suggest_dislike WHERE fk_parent_id = parentId
      );

  -- Origins and meaning related to name.
  CREATE TEMPORARY TABLE TempOriginsDefinitions AS
    SELECT
      o.origin_id,
      o.region,
      o.religion,
      o.description,
      d.definition_id,
      d.meaning,
      nso.fk_name_suggest_id
    FROM
      name_suggest_origin nso
    JOIN
      origin o ON nso.fk_origin_id = o.origin_id
    JOIN
      definition d ON o.fk_definition_id = d.definition_id
    WHERE
      nso.fk_name_suggest_id IN (SELECT name_suggest_id FROM TempNames);

  -- Results
  SELECT * FROM TempNames;
  SELECT * FROM TempOriginsDefinitions;

  DROP TEMPORARY TABLE IF EXISTS TempNames;
  DROP TEMPORARY TABLE IF EXISTS TempOriginsDefinitions;
END //
DELIMITER ;


#------------------ EVENTS ------------------

DROP EVENT IF EXISTS changeUserToInactive;
-- Change user_active to 0 after last login being over 1 year old
DELIMITER //
CREATE EVENT changeUserToInactive
    ON SCHEDULE
        EVERY 1 DAY STARTS CURRENT_TIMESTAMP
    DO BEGIN
    UPDATE user
    SET user_active = false
    WHERE last_login < NOW() - INTERVAL 1 YEAR
      AND user_active = true;
END //

DROP EVENT IF EXISTS changeUserToActive;
-- Change user_active to 1 after last login being under 1 year old
DELIMITER //
CREATE EVENT changeUserToActive
    ON SCHEDULE
        EVERY 1 DAY STARTS CURRENT_TIMESTAMP
    DO BEGIN
    UPDATE user
    SET user_active = true
    WHERE last_login > NOW() - INTERVAL 1 YEAR
      AND user_active = false;
END //