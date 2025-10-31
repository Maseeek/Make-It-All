//Dummy database is run using SQLite, actual database will use MySQL
//SQLite was chosen since it is similar enough to MySQL and
//easy to set up for prototyping

import sqlite3 from "sqlite3";
import { DummyDDLScript, DropTablesScript } from "./database_scripts.js";


//Function that runs the DDL script (Reads from a JS function returning the DDL string)
const runDDLScript = async function() {

    const db = new sqlite3.Database("./backend/database_prototyping/dummy_database.db");

    try {
        
        //Executes the DDL script chosen
        await db.exec(DummyDDLScript());
        //await db.exec(DropTablesScript());

    } catch (error) {
        console.error("Error running DDL script:", error);
    
    } finally {
        db.close();
    }
}

runDDLScript();