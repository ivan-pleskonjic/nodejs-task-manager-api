const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // this field is a reference to the User model
  }
}, {
  timestamps: true //enable timestamps for creation and last update times
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task