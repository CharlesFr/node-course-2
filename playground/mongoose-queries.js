const { ObjectId } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


var id = '5a42c085de5ab9041b3f4991';

if (!ObjectId.isValid(id)) {
  console.log('ID not valid');
} else {
  User.findById(id).then((user) => {
    if (!user) {
      return console.log('Nothing found');
    }
    console.log('TODOBYID', user);
  }).catch((e) => {
    console.log(e);
  });
}

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('TODODS:', todos)
// });
//
// Todo.findOne({
//   _id: id
// }).then((todos) => {
//   console.log('TODODS:', todos)
// });