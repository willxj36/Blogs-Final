use blogs;

CREATE TABLE Blogs (
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    content VARCHAR(1000),
    authorid INT,
    _created DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
CREATE TABLE Authors (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(64),
    _created DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
CREATE TABLE Tags (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    _created DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
CREATE TABLE BlogTags (
	blogid INT,
    tagid INT,
    PRIMARY KEY (blogid, tagid)
    );
    
ALTER TABLE Blogs
	ADD CONSTRAINT fk_author
    FOREIGN KEY (authorid)
    REFERENCES Authors(id);
    
ALTER TABLE BlogTags
	ADD CONSTRAINT fk_blog
    FOREIGN KEY (blogid)
    REFERENCES Blogs(id);
    
ALTER TABLE BlogTags
	ADD CONSTRAINT fk_tag
    FOREIGN KEY (tagid)
    REFERENCES Tags(id);
    
ALTER TABLE blogs
	ADD _updated DATETIME ON UPDATE CURRENT_TIMESTAMP;