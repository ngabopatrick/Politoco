import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PG_PORT
});

pool.on('connect', () => {
    console.log('Connected to the database...');
});

//create tables
const createTables = () => {
    const partyTable = `CREATE TABLE IF NOT EXISTS
    parties(
        id SERIAL PRIMARY KEY,
        partyName VARCHAR(128) NOT NULL,
        hqaddress VARCHAR(128) NOT NULL,
        logourl VARCHAR(128) NOT NULL,
        createdOn TIMESTAMP
    )`;

    const officeTable = `CREATE TABLE IF NOT EXISTS
        offices(
            id SERIAL PRIMARY KEY,
            officetype VARCHAR(50) NOT NULL,
            officename VARCHAR(60) NOT NULL,
            createdOn TIMESTAMP
        )`;

    const voteTable = `CREATE TABLE IF NOT EXISTS 
        votes(
            id SERIAL PRIMARY KEY,
            createdBy INT NOT NULL,
            office INT NOT NULL,
            candidate VARCHAR(255) NOT NULL,
            createdOn TIMESTAMP,
            FOREIGN KEY (createdBy) REFERENCES users (id) ON DELETE CASCADE,
            FOREIGN KEY (office) REFERENCES offices (id) ON DELETE CASCADE
        )`;

    const candidateTable = ` CREATE TABLE IF NOT EXISTS 
        candidates (
            id SERIAL PRIMARY KEY,
            office INT NOT NULL,
            party INT NOT NULL,
            candidate INT NOT NULL,
            FOREIGN KEY (office) REFERENCES offices (id) ON DELETE CASCADE,
            FOREIGN KEY (party) REFERENCES parties (id) ON DELETE CASCADE,
            FOREIGN KEY (candidate) REFERENCES users (id) ON DELETE CASCADE
        )`;
    const userTable = `CREATE TABLE IF NOT EXISTS 
        users (
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(60) NOT NULL,
            lastname VARCHAR(60) NOT NULL,
            othername VARCHAR(60),
            emailaddress VARCHAR(128) NOT NULL,
            phoneNumber VARCHAR(15) NOT NULL,
            passportUrl VARCHAR(255) NOT NULL,
            isAdmin BOOLEAN NOT NULL,
            password VARCHAR(255) NOT NULL,
            token VARCHAR(1024) NOT NULL,
            createdOn TIMESTAMP
        )`;
    pool.query(userTable);
    pool.query(partyTable);
    pool.query(officeTable);
    pool.query(voteTable);
    pool.query(candidateTable);
    pool.end();
};

//Drop tables
const dropTables = () => {
    const queryText = `DROP TABLE IF EXISTS 
        users,offices,parties,votes,candidates`;
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

pool.on('remove', () => {
    console.log('Client removed');
    process.exit(0);
});

//export pool and create tables to be accessible from and where within the application
export {
    createTables,
    dropTables,
    pool,
}
require('make-runnable');