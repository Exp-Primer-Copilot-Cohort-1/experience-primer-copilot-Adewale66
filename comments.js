// create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// get comments
app.get('/api/comments', (req, res) => {});