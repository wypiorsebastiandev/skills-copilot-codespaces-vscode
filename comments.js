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

//set up the route
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});