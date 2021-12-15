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
    qr_code varchar(10) NOT NULL, 
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

DROP TABLE IF EXISTS report CASCADE;
CREATE TABLE report (
    trash integer,
    client integer,
    PRIMARY KEY (trash, client)
);

ALTER TABLE personal_reward ADD CONSTRAINT FKPersonalRe968710 FOREIGN KEY (client_id) REFERENCES client (id);
ALTER TABLE personal_reward ADD CONSTRAINT FKPersonalRe89979 FOREIGN KEY (reward_id) REFERENCES reward (id);
ALTER TABLE reward ADD CONSTRAINT FKReward295879 FOREIGN KEY (vendor_id) REFERENCES vendor (id);
ALTER TABLE vendor ADD CONSTRAINT FKVendor47062 FOREIGN KEY (position_id) REFERENCES position (id);
ALTER TABLE trash ADD CONSTRAINT FKTrash231603 FOREIGN KEY (position_id) REFERENCES position (id);
ALTER TABLE report ADD CONSTRAINT FKReport24874 FOREIGN KEY (client) REFERENCES client (id);
ALTER TABLE report ADD CONSTRAINT FKReport275914 FOREIGN KEY (trash) REFERENCES trash (id);

/* -- Suppression tables
ALTER TABLE report DROP CONSTRAINT FKreport24874;
ALTER TABLE report DROP CONSTRAINT FKreport275914;
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
DROP TABLE IF EXISTS Vendor CASCADE;
DROP TABLE IF EXISTS report CASCADE; */

-- Insert

INSERT INTO client(first_name, last_name, birth_date, email, password)
VALUES('User','USER','2000-04-14','user@outlook.com','$2a$10$vQ1rrXjoPNYhualYPfWlFec41p3JpSQH33B4VwXEyeaUTKmoF4VSy'), --motdepasse
('John','Doe','1900-04-14','john.doe@outlook.com','jj'),
('Jean','Pierree','1900-08-14','jean.pierre@outlook.com','jp');

INSERT into manager(first_name, last_name, birth_date, email, password)
VALUES('Manager','MANAGER','1999-05-08','manager@outlook.com','$2a$10$fiKILzSQn2YvA.mbmxhqa.7f8pErrnl4qofZY7nE/a5Vq8KakfPKG'); --password

INSERT INTO position(coordinate_x, coordinate_y)
VALUES(50.4709020054474, 4.855681660495311),(50.46962242576424, 4.855643728330823),(50.472316745691465, 4.856349266590292),(50.47165042279585, 4.854407139768528);

INSERT INTO vendor(name_fr, name_en, description_fr, description_en, position_id)
VALUES ('Australian', 'Australian', 'Marchand de glaces', 'Ice-cream seller', 1);

INSERT INTO reward(name_fr, name_en, description_fr, description_en, throins_cost, real_cost, vendor_id)
VALUES('Glace 1 boule', 'One ball ice-cream', 'Une glace au parfum de votre choix', 'Ice cream with your own taste', 20, 5, 1);

INSERT INTO reward(name_fr, name_en, description_fr, description_en, throins_cost, real_cost, vendor_id)
VALUES('Glace Z boule', 'Two ball ice-cream', 'Une glace au parfum de votre choix', 'Ice cream with your own taste', 20, 5, 1);

INSERT INTO reward(name_fr, name_en, description_fr, description_en, throins_cost, real_cost, vendor_id)
VALUES('Glace 3 boule', 'Three ball ice-cream', 'Une glace au parfum de votre choix', 'Ice cream with your own taste', 20, 5, 1);

INSERT INTO reward(name_fr, name_en, description_fr, description_en, throins_cost, real_cost, vendor_id)
VALUES('Glace 4 boule', 'Four ball ice-cream', 'Une glace au parfum de votre choix', 'Ice cream with your own taste', 20, 5, 1);

INSERT INTO reward(name_fr, name_en, description_fr, description_en, throins_cost, real_cost, vendor_id)
VALUES('Glace 5 boule', 'Five ball ice-cream', 'Une glace au parfum de votre choix', 'Ice cream with your own taste', 20, 5, 1);

INSERT INTO reward(name_fr, name_en, description_fr, description_en, throins_cost, real_cost, vendor_id)
VALUES('Glace 6 boule', 'Six ball ice-cream', 'Une glace au parfum de votre choix', 'Ice cream with your own taste', 20, 5, 1);

INSERT INTO reward(name_fr, name_en, description_fr, description_en, throins_cost, real_cost, vendor_id)
VALUES('Glace 1 boule', 'Seven ball ice-cream', 'Une glace au parfum de votre choix', 'Ice cream with your own taste', 20, 5, 1);

INSERT INTO reward(name_fr, name_en, description_fr, description_en, throins_cost, real_cost, vendor_id)
VALUES('Glace 1 boule', 'Eight ball ice-cream', 'Une glace au parfum de votre choix', 'Ice cream with your own taste', 20, 5, 1);

INSERT INTO reward(name_fr, name_en, description_fr, description_en, throins_cost, real_cost, vendor_id)
VALUES('Glace 1 boule', 'Nine ball ice-cream', 'Une glace au parfum de votre choix', 'Ice cream with your own taste', 20, 5, 1);

INSERT INTO reward(name_fr, name_en, description_fr, description_en, throins_cost, real_cost, vendor_id)
VALUES('Glace 1 boule', 'Ten ball ice-cream', 'Une glace au parfum de votre choix', 'Ice cream with your own taste', 20, 5, 1);

INSERT INTO reward(name_fr, name_en, description_fr, description_en, throins_cost, real_cost, vendor_id)
VALUES('Glace 1 boule', 'Eleven ball ice-cream', 'Une glace au parfum de votre choix', 'Ice cream with your own taste', 20, 5, 1);


INSERT INTO trash(position_id, is_full, qr_code)
VALUES(1, true, 'aaaaaaaaa');

INSERT INTO trash(position_id,  is_full, qr_code)
VALUES(2,  true, 'aaaaaaaaab');

INSERT INTO trash(position_id, qr_code)
VALUES(3, 'aaaaaaaaac');

INSERT INTO trash(position_id, qr_code)
VALUES(4, 'aaaaaaaaad');
