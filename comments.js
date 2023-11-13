// create web server with express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// load comments module
const comments = require('./comments.js');

// configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set port
const port = 3000;

// handle GET request
app.get('/comments', (req, res) => {
  res.json(comments.getComments());
});

// handle POST request
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.addComment(newComment);
  res.json(newComment);
});

// handle PUT request
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const updatedComment = req.body;
  comments.updateComment(id, updatedComment);
  res.json(updatedComment);
});

// handle DELETE request
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  comments.deleteComment(id);
  res.send('Comment deleted');
});

// start server
app.listen(port, () => {
  console.log(`Server started: Listening at port ${port}`);
});