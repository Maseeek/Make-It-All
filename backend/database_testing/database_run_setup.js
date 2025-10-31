//Dummy database is run using SQLite, actual database will use MySQL
//SQLite was chosen since it is similar enough to MySQL and
//easy to set up for prototyping

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { DummyDDLScript, DropTablesScript } from "./database_scripts.js";

// const openDatabase = function() {
//     //const db = new sqlite3.Database("dummy_database.db", sqlite3.OPEN_READWRITE);
//     const db = new sqlite3.Database(":memory:", sqlite3.OPEN_READWRITE);
//     return db;
// }



//Function that runs the DDL script (Reads from a JS function returning the DDL string)
const runDDLScript = async function() {
    
    const db = await open({
        filename: ':memory:',
        driver: sqlite3.Database
    });

    try {
        
        //Executes the DDL script
        await db.exec(DummyDDLScript());
        //await db.exec(DropTablesScript()); //Drop tables line

        //Debug log to check if tables were created
        const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table';");
        console.log("Tables in the database:", tables);

    } catch (error) {
        console.error("Error running DDL script:", error);
    
    } finally {
        db.close();
    }

}

runDDLScript();