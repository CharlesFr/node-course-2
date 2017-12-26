//const MongoClient = require('mongodb').MongoClient;
const {
  MongoClient,
  ObjectID
} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to Mongodb server');
  }

  console.log('Connected to MongoDb server');

  db.collection('Users').find({
    age: 26
  }).toArray().then((docs) => {
    console.log('TODOS');
    console.log(JSON.stringify(docs, undefined, 2))
  }).catch((err) => {
    console.log("Error", err);
  })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`TODOS count: ${count}`);
  // }).catch((err) => {
  //   console.log("Error", err);
  // })

  db.close();
});