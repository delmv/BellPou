-- Création tables 
DROP TABLE IF EXISTS position CASCADE;
CREATE TABLE position (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    coordinate_x decimal NOT NULL, 
    coordinate_y decimal NOT NULL
    --location point NOT NULL
    ); 

DROP TABLE IF EXISTS reward CASCADE;
CREATE TABLE reward (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name_fr varchar(100) NOT NULL, 
    name_en varchar(100) NOT NULL, 
    description_fr varchar(255) NOT NULL, 
    description_en varchar(255) NOT NULL, 
    throins_cost integer NOT NULL, 
    real_cost float4 NOT NULL, 
    vendor_id integer NOT NULL 
    );

DROP TABLE IF EXISTS trash CASCADE;
CREATE TABLE trash (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    is_full bool NOT NULL DEFAULT false, 
    nb_alerts integer NOT NULL DEFAULT 0, 
    last_empty date DEFAULT NULL, 
    position_id int NOT NULL
    );

DROP TABLE IF EXISTS client CASCADE;
CREATE TABLE client (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name varchar(30) NOT NULL, 
    last_name varchar(30) NOT NULL, 
    birth_date date NOT NULL, 
    nb_throins integer NOT NULL DEFAULT 0, 
    email varchar(100) NOT NULL UNIQUE, 
    password varchar NOT NULL, 
    nb_bad_reports integer NOT NULL DEFAULT 0, 
    is_banned bool NOT NULL DEFAULT false
    );

DROP TABLE IF EXISTS manager CASCADE;
CREATE TABLE manager (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name varchar(30) NOT NULL, 
    last_name varchar(30) NOT NULL, 
    birth_date date NOT NULL, 
    email varchar(100) NOT NULL UNIQUE, 
    password varchar NOT NULL 
    );

DROP TABLE IF EXISTS vendor CASCADE;
CREATE TABLE vendor (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name_fr varchar(100) NOT NULL, 
    name_en varchar(100) NOT NULL, 
    description_fr varchar(255) NOT NULL, 
    description_en varchar(255) NOT NULL, 
    position_id int NOT NULL
    );

DROP TABLE IF EXISTS personal_reward CASCADE;
CREATE TABLE personal_reward (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    discount_code varchar NOT NULL, 
    exp_date date NOT NULL, 
    is_used bool NOT NULL DEFAULT false,
    client_id integer NOT NULL, 
    reward_id integer NOT NULL
    );

ALTER TABLE personal_reward ADD CONSTRAINT FKPersonalRe968710 FOREIGN KEY (client_id) REFERENCES client (id);
ALTER TABLE personal_reward ADD CONSTRAINT FKPersonalRe89979 FOREIGN KEY (reward_id) REFERENCES reward (id);
ALTER TABLE reward ADD CONSTRAINT FKReward295879 FOREIGN KEY (vendor_id) REFERENCES vendor (id);
ALTER TABLE vendor ADD CONSTRAINT FKVendor47062 FOREIGN KEY (position_id) REFERENCES position (id);
ALTER TABLE trash ADD CONSTRAINT FKTrash231603 FOREIGN KEY (position_id) REFERENCES position (id);

/* -- Suppression tables
ALTER TABLE PersonalReward DROP CONSTRAINT FKPersonalRe968710;
ALTER TABLE PersonalReward DROP CONSTRAINT FKPersonalRe89979;
ALTER TABLE Reward DROP CONSTRAINT FKReward295879;
ALTER TABLE Vendor DROP CONSTRAINT FKVendor47062;
ALTER TABLE Trash DROP CONSTRAINT FKTrash231603;
DROP TABLE IF EXISTS Location CASCADE;
DROP TABLE IF EXISTS PersonalReward CASCADE;
DROP TABLE IF EXISTS Reward CASCADE;
DROP TABLE IF EXISTS Trash CASCADE;
DROP TABLE IF EXISTS client CASCADE;
DROP TABLE IF EXISTS Vendor CASCADE; */

-- Insert

INSERT INTO client(first_name, last_name, birth_date, email, password)
VALUES('User','USER','2000-04-14','user@outlook.com','$2a$10$vQ1rrXjoPNYhualYPfWlFec41p3JpSQH33B4VwXEyeaUTKmoF4VSy'), --motdepasse
('John','Doe','1900-04-14','john.doe@outlook.com','jj'),
('Jean','Pierree','1900-08-14','jean.pierre@outlook.com','jp');

INSERT into manager(first_name, last_name, birth_date, email, password)
VALUES('Manager','MANAGER','1999-05-08','manager@outlook.com','$2a$10$fiKILzSQn2YvA.mbmxhqa.7f8pErrnl4qofZY7nE/a5Vq8KakfPKG'); --password

INSERT INTO position(coordinate_x, coordinate_y)
VALUES(10,20),(20,30),(40,50),(60,70);

INSERT into trash(position_id)
VALUES(1);