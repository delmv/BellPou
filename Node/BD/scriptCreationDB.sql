-- Création tables 
CREATE TABLE Location (location SERIAL NOT NULL, PRIMARY KEY (location));
CREATE TABLE PersonalReward (id SERIAL NOT NULL, discountCode varchar(10) NOT NULL, expDate date NOT NULL, isUsed bool NOT NULL, RewardColumn int4 NOT NULL, Userid int4 NOT NULL, Rewardid int4 NOT NULL, PRIMARY KEY (id));
CREATE TABLE Reward (id SERIAL NOT NULL, nameFR varchar(100) NOT NULL, nameANG varchar(100) NOT NULL, descriptionFR varchar(255) NOT NULL, descriptionANG varchar(255) NOT NULL, throinsCost int2 NOT NULL, realCost float4 NOT NULL, VendorId int4 NOT NULL, PRIMARY KEY (id));
CREATE TABLE Trash (id SERIAL NOT NULL, isFull bool NOT NULL, nbAlerts int2 NOT NULL, lastEmpty date, Locationlocation point, PRIMARY KEY (id));
CREATE TABLE User (id SERIAL NOT NULL, firstName varchar(30) NOT NULL, lastName varchar(30) NOT NULL, birthDate date NOT NULL, nbThoins int2 NOT NULL, email varchar(100) NOT NULL, password varchar(50) NOT NULL, nbBadReports int2 NOT NULL, isBanned bool NOT NULL, isAdmin bool NOT NULL, PRIMARY KEY (id));
CREATE TABLE Vendor (id SERIAL NOT NULL, nameFR varchar(100) NOT NULL, nameANG varchar(100) NOT NULL, descriptionFR varchar(255) NOT NULL, descriptionANG varchar(255) NOT NULL, Locationlocation point, PRIMARY KEY (id));
ALTER TABLE PersonalReward ADD CONSTRAINT FKPersonalRe968710 FOREIGN KEY (Userid) REFERENCES User (id);
ALTER TABLE PersonalReward ADD CONSTRAINT FKPersonalRe89979 FOREIGN KEY (Rewardid) REFERENCES Reward (id);
ALTER TABLE Reward ADD CONSTRAINT FKReward295879 FOREIGN KEY (VendorId) REFERENCES Vendor (id);
ALTER TABLE Vendor ADD CONSTRAINT FKVendor47062 FOREIGN KEY (Locationlocation) REFERENCES Location (location);
ALTER TABLE Trash ADD CONSTRAINT FKTrash231603 FOREIGN KEY (Locationlocation) REFERENCES Location (location);

-- Suppression tables
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
DROP TABLE IF EXISTS Vendor CASCADE;