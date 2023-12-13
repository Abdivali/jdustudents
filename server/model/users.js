const mongoose = require('mongoose');

const UsersSChema = mongoose.Schema({
 id: {
     type: String, 
 },
 unexcused: {
    type: Number, 
},
absence: {
    type: Number, 
},late: {
    type: Number, 
},
 name: {
  type: String, 
 },
 teacher: { 
  type: String, 
 },
 subject: { 
    type: String, 
   },
group: { 
    type: String, 
},
lessonCount: { 
    type: String, 
},
})

module.exports = mongoose.model('User', UsersSChema)