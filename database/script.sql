CREATE TABLE `tasks` (
  `taskID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `taskName` varchar(50) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateDue` datetime DEFAULT NULL,
  `dateCompleted` datetime DEFAULT NULL,
  PRIMARY KEY (`taskID`),
  UNIQUE KEY `taskID_UNIQUE` (`taskID`),
  KEY `fk_tasks_userID_idx` (`userID`),
  CONSTRAINT `fk_tasks_userID` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `hash` char(60) NOT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into users ( username, hash, firstname, lastname, datecreated)
values( 'user','','Test','User',curdate());
