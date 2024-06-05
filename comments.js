//create web server
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

//set up the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

//set up the route
app.get('/', (req, res) => {
    res.send('Welcome to my web server!');
});