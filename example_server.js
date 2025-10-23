const express = require('express');
const app = express();
const port = 9000;

//Serves static files from the 'public' directory
app.use(express.static('public'));

//Test API endpoint
app.get('/', (req, res) => {
    res.json({message: 'API Test'})
});

//Starts the server
app.listen(port, () => {
    console.log(`Temporary server running at http://localhost:${port}`);
});