const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
}

var token = jwt.sign(data, '123abc');
console.log(JSON.stringify(jwt.verify(token, '123abc'), undefined, 2));

//jwt.verify


// JWT object
// var message = 'I am a new user';
// var hash = SHA256(message).toString();
//
//
// console.log(SHA256(hash).toString());
//
// var data = {
//   id: 4
// }
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'someSecret').toString()
// }
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'someSecret').toString();=
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed');
// }