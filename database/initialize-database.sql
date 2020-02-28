-- Create a table to store user accounts in.
CREATE TABLE accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(50) NOT NULL,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(30) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username),
	CONSTRAINT emailUnique UNIQUE (email)
);

-- Create a dummy account for testing.
INSERT INTO accounts (email,username, password) VALUES ("alice@gmail.com","Alice", "abc123");


CREATE TABLE petitions (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	author VARCHAR(50) NOT NULL,
	commentary VARCHAR(100) NOT NULL,
	place VARCHAR(50) NOT NULL,
	state VARCHAR(30) NOT NULL,
	photo VARCHAR(100),
	active BOOLEAN NOT NULL,
	account_id INT UNSIGNED,
	FOREIGN KEY (account_id) REFERENCES accounts(id)
);


CREATE TABLE offer (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	author VARCHAR(50) NOT NULL,
	commentary VARCHAR(100) NOT NULL,
	place VARCHAR(50) NOT NULL,
	state VARCHAR(30) NOT NULL,
	photo VARCHAR(100),
	account_id INT UNSIGNED,
	petition_id INT UNSIGNED,
	active BOOLEAN NOT NULL,
	price INT NOT NULL,
	FOREIGN KEY (account_id) REFERENCES accounts(id),
	FOREIGN KEY (petition_id) REFERENCES petitions(id)
);