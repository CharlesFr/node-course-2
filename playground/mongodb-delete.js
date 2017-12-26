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

  // db.collection('Users').deleteMany({
  //   name: 'Charles Fried'
  // }).then((res) => {
  //   console.log(res);
  // }).catch((err) => {
  //   console.log("Error", err);
  // });

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5a4232f8fbdf4ac96c6b42d0')
  }).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log("Error", err);
  });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`TODOS count: ${count}`);
  // }).catch((err) => {
  //   console.log("Error", err);
  // })

  db.close();
});