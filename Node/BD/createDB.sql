-- Création tables 
DROP TABLE IF EXISTS Location CASCADE;
CREATE TABLE Location (
    location SERIAL NOT NULL, 
    PRIMARY KEY (location)
    );

DROP TABLE IF EXISTS PersonalReward CASCADE;
CREATE TABLE PersonalReward (
    integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    discountCode varchar NOT NULL, 
    expDate date NOT NULL, 
    isUsed bool NOT NULL DEFAULT false, 
    RewardColumn integer NOT NULL, 
    Userid integer NOT NULL, 
    Rewardid integer NOT NULL
    );

DROP TABLE IF EXISTS Reward CASCADE;
CREATE TABLE Reward (
    integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nameFR varchar(100) NOT NULL, 
    nameANG varchar(100) NOT NULL, 
    descriptionFR varchar(255) NOT NULL, 
    descriptionANG varchar(255) NOT NULL, 
    throinsCost integer NOT NULL, 
    realCost float4 NOT NULL, 
    VendorId integer NOT NULL 
    );

DROP TABLE IF EXISTS Trash CASCADE;
CREATE TABLE Trash (
    integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    isFull bool NOT NULL DEFAULT false, 
    nbAlerts integer NOT NULL, 
    lastEmpty date, 
    Locationlocation point, 
    );

DROP TABLE IF EXISTS User CASCADE;
CREATE TABLE User (
    integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstName varchar(30) NOT NULL, 
    lastName varchar(30) NOT NULL, 
    birthDate date NOT NULL, 
    nbThoins integer NOT NULL DEFAULT 0, 
    email varchar(100) NOT NULL, 
    password varchar(50) NOT NULL, 
    nbBadReports integer NOT NULL DEFAULT 0, 
    isBanned bool NOT NULL DEFAULT false, 
    isAdmin bool NOT NULL DEFAULT false, 
    );

DROP TABLE IF EXISTS Vendor CASCADE;
CREATE TABLE Vendor (
    integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nameFR varchar(100) NOT NULL, 
    nameANG varchar(100) NOT NULL, 
    descriptionFR varchar(255) NOT NULL, 
    descriptionANG varchar(255) NOT NULL, 
    Locationlocation point
    );

ALTER TABLE PersonalReward ADD CONSTRAINT FKPersonalRe968710 FOREIGN KEY (Userid) REFERENCES User (id);
ALTER TABLE PersonalReward ADD CONSTRAINT FKPersonalRe89979 FOREIGN KEY (Rewardid) REFERENCES Reward (id);
ALTER TABLE Reward ADD CONSTRAINT FKReward295879 FOREIGN KEY (VendorId) REFERENCES Vendor (id);
ALTER TABLE Vendor ADD CONSTRAINT FKVendor47062 FOREIGN KEY (Locationlocation) REFERENCES Location (location);
ALTER TABLE Trash ADD CONSTRAINT FKTrash231603 FOREIGN KEY (Locationlocation) REFERENCES Location (location);

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
DROP TABLE IF EXISTS User CASCADE;
DROP TABLE IF EXISTS Vendor CASCADE; */
