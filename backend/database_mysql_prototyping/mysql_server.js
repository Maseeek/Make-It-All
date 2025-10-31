//MySQL Server Setup (Connection Test)
//NOTE: Remember to upload the subdirectory to the university server
const path = require('path');
const testDatabase = path.join(__dirname, 'mysql_db_config.js');

async function connectionTest() {
    try {
        //Example DML query
        const [rows] = await testDatabase.query('SELECT * from db_connection_test;');
        console.table(rows);

    } catch (errorMessage) {
        console.error("Database connection failed: ", errorMessage);
    
    } finally {
        await testDatabase.end();
    }
}

export {testDatabase};

connectionTest();