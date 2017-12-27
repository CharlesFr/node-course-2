const mongoose = require('mongoose');

let User = mongoose.model('Users', {
  email: {
    type: String,
    trim: true,
    minlength: 1,
    required: true
  }
});

// let newUser = new User({
//   email: '   Talk@charlesfried.com'
// });
//
//
// newUser.save().then((doc) => {
//   console.log('Saved todo', doc)
// }), (e) => {
//   console.log('Unable to save todo')
// };

module.exports = {
  User
}