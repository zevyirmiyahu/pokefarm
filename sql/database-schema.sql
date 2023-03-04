-- Directions run the following in the order given in mysql> 

CREATE DATABASE pokefarm;

USE pokefarm;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    user_name VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    money INT CHECK (money >= 0),
    pokemons JSON
);

create user 'springuser'@'%' identified by 'ThePassword'; -- Creates the user
grant all on users.* to 'springuser'@'%'; -- Gives all privileges to the new user on the newly created database








CREATE TABLE pokemons (
    id INT AUTO_INCREMENT PRIMARY_KEY,
    pokemon_unique_id VARCHAR(255),
    pokemon_id INT CHECK (pokemonId >= 1),
    name VARCHAR(255),
    types VARCHAR(255),
    money INT CHECK (money >= 0),
    is_working BOOLEAN,
);

CREATE TABLE user_pokemon (

);