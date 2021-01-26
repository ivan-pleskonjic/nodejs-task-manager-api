const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // removes trailing and leading whitespaces
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // convert value to lowercase
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error('Email is invalid')
    }
  },
  password: {
    type: String,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) throw new Error('Password cannot contain \'password\'!')
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error('Age must be a positive number!')
    } 
  },
  tokens: [{ // array containing objects of the following form
    token: {
      type: String,
      required: true
    }
  }],
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true //enable timestamps for creation and last update times
})
// new instacne method
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  // delete data we don't want to share or return via http
  delete userObject.password
  delete userObject.token
  delete userObject.avatar

  return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email})

  if(!user)
    throw new Error('Unable to log in')

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch)
    throw new Error('Unable to log in')
  
  return user
}

// the function must be a regular function and  can't be an arrow fn
// because of the use of this
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    // hash password before saving
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
  const user = this
  await Task.deleteMany({ owner: user._id })
  
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User