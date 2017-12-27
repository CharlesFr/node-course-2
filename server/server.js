const express = require('express');
const bodyParser = require('body-parser');

const { ObjectId } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

var app = express();

// Middleware
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

// CRUD operations
// Create (POST) - Read (GET) - Update - Delete (DELETE)

app.post('/todos', (req, res) => {
  var todo = new Todo({ text: req.body.text })

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

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todos) => {
    if (!todos) {
      return res.status(404).send();
    }
    res.status(200).send({ todos });
  }).catch((e) => {
    res.status(404).send();
  });

})

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todos) => {
    if (!todos) {
      return res.status(404).send();
    }
    res.status(200).send({ todos });
  }).catch((e) => {
    res.status(404).send();
  });
})

app.listen(port, () => console.log(`Started on port ${port}`));



module.exports = { app };