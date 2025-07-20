-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS DATA;

-- Switch to the database
USE DATA;

-- Create the 'user' table
CREATE TABLE IF NOT EXISTS user (
    userId VARCHAR(50) PRIMARY KEY,         -- Unique ID (UUID recommended)
    username VARCHAR(50) UNIQUE,            -- Must be unique
    email VARCHAR(50) UNIQUE NOT NULL,      -- Must be unique and not null
    password VARCHAR(50) NOT NULL           -- Store hashed password in production
);
