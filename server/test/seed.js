const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const users = [{
    _id: userOneId,
    email: 'Talk@charlesfried.com',
    password: 'userOnePass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
    }]
  },
  {
    _id: userTwoId,
    email: 'Design@charlesfried.com',
    password: 'userTwoPass'
  }
];

const populateUsers = (done => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]).then();
  }).then(() => done());
});

const todos = [{
  _id: new ObjectId(),
  text: 'First test todo'
}, {
  _id: new ObjectId(),
  text: 'Second test dodo',
  completed: true,
  completedAt: 444
}]

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done());
}

module.exports = { todos, populateTodos, populateUsers, users }