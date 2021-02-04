USE blogs;

CREATE PROCEDURE spBlogTags
	(blogid INT)
    SELECT
		t.name
	FROM BlogTags bt
    JOIN Tags t ON t.id = bt.tagid
    WHERE bt.blogid = blogid;
    
CREATE USER
	'blogapp'@'localhost'
IDENTIFIED BY 'password123';

GRANT ALL ON blogs.* TO 'blogapp'@'localhost';

ALTER USER 'blogapp'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password123';

SELECT * FROM tags;
SELECT * FROM authors;
SELECT * FROM blogs;
SELECT * FROM blogtags;
SELECT * FROM accesstokens;

DELETE FROM authors WHERE id>0;
DELETE FROM blogs WHERE id > 0;
DELETE FROM blogtags WHERE blogid > 0;
DELETE FROM accesstokens WHERE id > 0;

SELECT name FROM tags;