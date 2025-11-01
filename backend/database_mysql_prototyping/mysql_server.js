//MySQL Server Setup (Connection Test)
//NOTE: Remember to upload the subdirectory to sci-project

//To run this file in your terminal on the server to test the script like so:
//1. Create an SSH session to sci-project and login (ssh [username]@sci-project)
//2. "cd /var/www/clients/client0000/web0000/private/"directory_name"
//3. node mysql_server.js

//Remember to replace the placeholder details in "test_config.json" with
//your own or the team details when running this file

const {
    createTablesScript,
    DropTablesScript
} = require("./mysql_database_scripts.js");
const path = require('path');
//"__dirname" = Currently active directory
const testDatabase = require(path.join(__dirname, "mysql_db_config.js"));


//Procedure to execute multiple SQL statements in one string (Does not return)
const multiExecuteProcedure = async (queryString) => {
    const statements = queryString
        .split(';')
        .map(s => s.trim())
        .filter(Boolean);

    for (const statement of statements) {
        await testDatabase.execute(statement);
    }
}


async function connectionTest() {
    try {
        //Example DDL queries
        //Multiple statements in one string need to be split and executed individually
        await multiExecuteProcedure(DropTablesScript());
        await multiExecuteProcedure(createTablesScript());

        

    } catch (errorMessage) {
        console.error("Database connection failed: ", errorMessage);
    
    } finally {
        await testDatabase.end();
    }
}

connectionTest();