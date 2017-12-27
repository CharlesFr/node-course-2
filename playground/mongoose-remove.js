const { ObjectId } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// }, (e) => {
//   console.log(e);
// });

// Todo.findOneAndRemove(() => {
//
// });


Todo.findByIdAndRemove('5a43b9a2ec355197183c7142').then((todo) => {
  console.log(todo);
});