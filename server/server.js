const express = require('express');
const bodyParser = require('body-parser');

const {
  mongoose
} = require('./db/mongoose');
const {
  Todo
} = require('./models/todo');
const {
  User
} = require('./models/user');

var app = express();


// Middleware
app.use(bodyParser.json());

var port = 3000; //Process.env.PORT || 3000;

// CRUD operations
// Create (POST) - Read (GET) - Update - Delete (DELETE)

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
  console.log(typeof req.body);
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    })
  }, (e) => {
    res.status(400).send(e);
  })
});

app.listen(port, () => {
  console.log(`Started on port ${port}`)
});



module.exports = {
  app
};