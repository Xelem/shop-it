const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please input your name'],
    unique: false,
  },
  email: {
    type: String,
    required: [true, 'Please input your name'],
    unique: [true, 'A user with this email already exists'],
    validate: [validator.isEmail, 'Please input your email'],
  },
  role: {
    type: String,
    required: [true, 'Please input your role'],
    enum: ['buyer', 'seller'],
  },
  password: {
    type: String,
    minlength: [8, 'A password cannot be less than 8 characters'],
    trim: true,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  // ONLY RUN IF PASSWORD WAS MODIFIED
  if (!this.isModified('password')) return next();

  // HASH PASSWORD WITH COST OF 12
  this.password = await bcrypt.hash(this.password, 12);

  // DELETE PASSWORD CONFIRM FIELD
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
