-- Directions run the following in the order given in mysql> 
-- This creates the database and user needed for the Application to work.

CREATE DATABASE pokefarm; -- Create the database

USE pokefarm; -- using that database we create a users table next step

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    user_name VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    money INT CHECK (money >= 0),
    pokemons JSON
);

-- Create User
CREATE USER 'developer'@'localhost' IDENTIFIED BY 'StupidPassword'; -- Creates the user
GRANT ALL PRIVILEGES ON pokefarm.* TO 'developer'@'localhost';
FLUSH PRIVILEGES; -- Reloads into Memory updates
