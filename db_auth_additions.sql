USE blogs;

ALTER TABLE authors
	ADD password VARCHAR(60),
    ADD role VARCHAR(24) DEFAULT 'guest';
    
CREATE TABLE accesstokens(
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    userid INT,
    token TEXT NOT NULL,
    _created DATETIME DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT FOREIGN KEY (userid) 
		REFERENCES authors(id));