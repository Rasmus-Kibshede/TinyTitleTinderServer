create table if not exists adt_address
(
    _seq           bigint auto_increment
        primary key,
    _action        varchar(20)                              not null,
    _modifiedAt    datetime(6) default CURRENT_TIMESTAMP(6) not null,
    address_id     int                                      null,
    city           varchar(255)                             null,
    zipcode        varchar(255)                             null,
    street         varchar(255)                             null,
    fk_location_id int                                      null
);

create index IDX_a8d3a7b85da71ac28fa24f340e
    on adt_address (address_id);

create table if not exists adt_definition
(
    _seq          bigint auto_increment
        primary key,
    _action       varchar(20)                              not null,
    _modifiedAt   datetime(6) default CURRENT_TIMESTAMP(6) not null,
    definition_id int                                      null,
    meaning       varchar(255)                             null
);

create index IDX_9c4bccbc91a43fef46aff43d54
    on adt_definition (definition_id);

create table if not exists adt_family
(
    _seq        bigint auto_increment
        primary key,
    _action     varchar(20)                              not null,
    _modifiedAt datetime(6) default CURRENT_TIMESTAMP(6) not null,
    family_id   int                                      null,
    family_name varchar(255)                             null
);

create index IDX_a3be955fc4181bf4c68c2e647c
    on adt_family (family_id);

create table if not exists adt_location
(
    _seq        bigint auto_increment
        primary key,
    _action     varchar(20)                              not null,
    _modifiedAt datetime(6) default CURRENT_TIMESTAMP(6) not null,
    location_id int                                      null,
    country     varchar(255)                             null
);

create index IDX_db26c940d10bf3cb242e432b81
    on adt_location (location_id);

create table if not exists adt_name
(
    _seq              bigint auto_increment
        primary key,
    _action           varchar(20)                              not null,
    _modifiedAt       datetime(6) default CURRENT_TIMESTAMP(6) not null,
    modified_by       varchar(255)                             null,
    name_suggest_id   int                                      null,
    name_suggest_name varchar(255)                             null,
    gender            varchar(255)                             null,
    popularity        int                                      null,
    name_days         varchar(255)                             null,
    namesakes         varchar(255)                             null
);

create index IDX_5e99420d07ade2d9447cdc913b
    on adt_name (name_suggest_id);

create table if not exists adt_origin
(
    _seq             bigint auto_increment
        primary key,
    _action          varchar(20)                              not null,
    _modifiedAt      datetime(6) default CURRENT_TIMESTAMP(6) not null,
    origin_id        int                                      null,
    region           varchar(255)                             null,
    religion         varchar(255)                             null,
    description      text                                     null,
    fk_definition_id int                                      null,
    constraint UQ_d4396473c76ba935795cf8042e1
        unique (fk_definition_id)
);

create index IDX_c332b90d8734a2bb1bb4a61f6e
    on adt_origin (origin_id);

create table if not exists adt_parent
(
    _seq          bigint auto_increment
        primary key,
    _action       varchar(20)                              not null,
    _modifiedAt   datetime(6) default CURRENT_TIMESTAMP(6) not null,
    parent_id     int                                      null,
    age           int                                      null,
    gender        varchar(255)                             null,
    first_name    varchar(255)                             null,
    last_name     varchar(255)                             null,
    fk_address_id int                                      null,
    constraint UQ_f57f52791dfcf3178a9ea6c1850
        unique (fk_address_id)
);

create index IDX_6a989d032b28597ed8935f7ce3
    on adt_parent (parent_id);

create table if not exists adt_role
(
    _seq        bigint auto_increment
        primary key,
    _action     varchar(20)                              not null,
    _modifiedAt datetime(6) default CURRENT_TIMESTAMP(6) not null,
    role_id     int                                      null,
    title       varchar(255)                             null
);

create index IDX_f0fde5e74c261b072fff57934c
    on adt_role (role_id);

create table if not exists adt_user
(
    _seq         bigint auto_increment
        primary key,
    _action      varchar(20)                              not null,
    _modifiedAt  datetime(6) default CURRENT_TIMESTAMP(6) not null,
    modified_by  varchar(255)                             null,
    user_id      int                                      null,
    email        varchar(255)                             null,
    password     varchar(255)                             null,
    user_active  tinyint     default 1                    null,
    created_at   datetime                                 null,
    last_login   datetime                                 null,
    fk_parent_id int                                      null,
    constraint UQ_61d6398363d921290944a0fd1de
        unique (fk_parent_id)
);

create index IDX_187ea6376d4189b37b7c2694ea
    on adt_user (user_id);

create table if not exists adt_user_role
(
    fk_user_id int not null,
    fk_role_id int not null,
    primary key (fk_user_id, fk_role_id),
    constraint FK_944d1a96609363e210f204eeade
        foreign key (fk_user_id) references adt_user (user_id)
            on update cascade on delete cascade,
    constraint FK_d722035bf6d1ff12c064ccdaa7c
        foreign key (fk_role_id) references adt_role (role_id)
);

create index IDX_944d1a96609363e210f204eead
    on adt_user_role (fk_user_id);

create index IDX_d722035bf6d1ff12c064ccdaa7
    on adt_user_role (fk_role_id);

create table if not exists definition
(
    definition_id int auto_increment
        primary key,
    meaning       varchar(255) not null,
    constraint IDX_8200d2ad9375459741578d4e53
        unique (meaning)
);

create table if not exists family
(
    family_id   int auto_increment
        primary key,
    family_name varchar(255) not null
);

create table if not exists location
(
    location_id int auto_increment
        primary key,
    country     varchar(255) not null
);

create table if not exists address
(
    address_id     int auto_increment
        primary key,
    city           varchar(255) not null,
    zipcode        varchar(255) not null,
    street         varchar(255) not null,
    fk_location_id int          null,
    constraint FK_b194271a8d23b6f401e16289a05
        foreign key (fk_location_id) references location (location_id)
);

create table if not exists name_suggest
(
    name_suggest_id   int auto_increment
        primary key,
    name_suggest_name varchar(255) not null,
    gender            varchar(255) not null,
    popularity        int          null,
    name_days         varchar(255) null,
    namesakes         varchar(255) null,
    constraint IDX_cf2f576f106f88d6f150014a9f
        unique (name_suggest_name),
    constraint name
        unique (name_suggest_name)
);

create table if not exists origin
(
    origin_id        int auto_increment
        primary key,
    region           varchar(255) not null,
    religion         varchar(255) not null,
    description      text         not null,
    fk_definition_id int          null,
    constraint REL_2a1623edf8a7e156d717d846b0
        unique (fk_definition_id),
    constraint FK_2a1623edf8a7e156d717d846b00
        foreign key (fk_definition_id) references definition (definition_id)
);

create table if not exists name_suggest_origin
(
    fk_name_suggest_id int not null,
    fk_origin_id       int not null,
    primary key (fk_name_suggest_id, fk_origin_id),
    constraint FK_01dbfebf787da5a9d2208ada58f
        foreign key (fk_origin_id) references origin (origin_id),
    constraint FK_7dcfb4ba9f56fdec79ef1564c86
        foreign key (fk_name_suggest_id) references name_suggest (name_suggest_id)
            on update cascade on delete cascade
);

create index IDX_01dbfebf787da5a9d2208ada58
    on name_suggest_origin (fk_origin_id);

create index IDX_7dcfb4ba9f56fdec79ef1564c8
    on name_suggest_origin (fk_name_suggest_id);

create table if not exists parent
(
    parent_id     int auto_increment
        primary key,
    age           int          not null,
    gender        varchar(255) not null,
    first_name    varchar(255) not null,
    last_name     varchar(255) not null,
    fk_address_id int          null,
    constraint REL_bbc352961d412b2a3998728124
        unique (fk_address_id),
    constraint FK_bbc352961d412b2a39987281243
        foreign key (fk_address_id) references address (address_id)
);

create table if not exists family_parent
(
    fk_family_id int not null,
    fk_parent_id int not null,
    primary key (fk_family_id, fk_parent_id),
    constraint FK_3e3e63a4fffbeb10cf8dff59c5e
        foreign key (fk_parent_id) references parent (parent_id),
    constraint FK_6f384df9b6424f81f27af972c8c
        foreign key (fk_family_id) references family (family_id)
            on update cascade on delete cascade
);

create index IDX_3e3e63a4fffbeb10cf8dff59c5
    on family_parent (fk_parent_id);

create index IDX_6f384df9b6424f81f27af972c8
    on family_parent (fk_family_id);

create table if not exists parent_name_suggest
(
    fk_parent_id       int not null,
    fk_name_suggest_id int not null,
    primary key (fk_parent_id, fk_name_suggest_id),
    constraint FK_f95c1f30005e5970dec06d9e5f9
        foreign key (fk_parent_id) references parent (parent_id)
            on update cascade on delete cascade,
    constraint FK_faad4bdf498618863b1828350c6
        foreign key (fk_name_suggest_id) references name_suggest (name_suggest_id)
);

create index IDX_f95c1f30005e5970dec06d9e5f
    on parent_name_suggest (fk_parent_id);

create index IDX_faad4bdf498618863b1828350c
    on parent_name_suggest (fk_name_suggest_id);

create table if not exists parent_name_suggest_dislike
(
    fk_parent_id       int not null,
    fk_name_suggest_id int not null,
    primary key (fk_parent_id, fk_name_suggest_id),
    constraint FK_a48a0d7b43625540d347195c6e4
        foreign key (fk_name_suggest_id) references name_suggest (name_suggest_id),
    constraint FK_b1618db647b6ed9ab99b7c0f45f
        foreign key (fk_parent_id) references parent (parent_id)
            on update cascade on delete cascade
);

create index IDX_a48a0d7b43625540d347195c6e
    on parent_name_suggest_dislike (fk_name_suggest_id);

create index IDX_b1618db647b6ed9ab99b7c0f45
    on parent_name_suggest_dislike (fk_parent_id);

create table if not exists role
(
    role_id int auto_increment
        primary key,
    title   varchar(255) not null
);

create table if not exists user
(
    user_id      int auto_increment
        primary key,
    email        varchar(255)                             not null,
    password     varchar(255)                             not null,
    user_active  tinyint     default 1                    not null,
    created_at   datetime(6) default CURRENT_TIMESTAMP(6) not null,
    last_login   datetime                                 null,
    fk_parent_id int                                      null,
    constraint IDX_e12875dfb3b1d92d7d7c5377e2
        unique (email),
    constraint REL_532402f823933f873eedbe4eb2
        unique (fk_parent_id),
    constraint login
        unique (email),
    constraint FK_532402f823933f873eedbe4eb2d
        foreign key (fk_parent_id) references parent (parent_id)
);

create table if not exists user_role
(
    fk_user_id int not null,
    fk_role_id int not null,
    primary key (fk_user_id, fk_role_id),
    constraint FK_3dfb13d2c2f2d5d5800bcfc0a11
        foreign key (fk_role_id) references role (role_id),
    constraint FK_57c3af6b060d4c56bde237afd06
        foreign key (fk_user_id) references user (user_id)
            on update cascade on delete cascade
);

create index IDX_3dfb13d2c2f2d5d5800bcfc0a1
    on user_role (fk_role_id);

create index IDX_57c3af6b060d4c56bde237afd0
    on user_role (fk_user_id);

create
    procedure CreateUserWithRoleAndLocation(IN p_email varchar(255),
                                                                      IN p_password varchar(255), IN p_age int,
                                                                      IN p_gender varchar(10),
                                                                      IN p_first_name varchar(255),
                                                                      IN p_last_name varchar(255),
                                                                      IN p_location_id varchar(255),
                                                                      IN p_city varchar(255), IN p_zipcode varchar(20),
                                                                      IN p_address varchar(255))
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
END;

create
        procedure GetAllNamesLikedByFamily(IN familyId int)
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
END;

create
    procedure GetDislikedNamesOriginsDefinitionsByParentId(IN parentId int)
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
END;

create
    procedure GetNamesOriginsDefinitionsByParentId(IN parentId int)
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
END;

create
    procedure GetNamesWithNoParentRelation(IN parentId int)
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
END;

create event if not exists changeUserToActive on schedule
    every '1' DAY
        starts '2023-12-15 11:16:11'
    enable
    do
    BEGIN
    UPDATE user
    SET user_active = true
    WHERE last_login > NOW() - INTERVAL 1 YEAR
      AND user_active = false;
END;

create event if not exists changeUserToInactive on schedule
    every '1' DAY
        starts '2023-12-15 11:16:11'
    enable
    do
    BEGIN
    UPDATE user
    SET user_active = false
    WHERE last_login < NOW() - INTERVAL 1 YEAR
      AND user_active = true;
END;


/*------------------------------------------------------------------------------------------------------------------*/


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

ALTER TABLE adt_user
    DROP COLUMN fk_parent_id;

ALTER TABLE adt_user
    ADD COLUMN fk_parent_id INT;