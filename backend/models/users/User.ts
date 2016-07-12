import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserModelInterface } from './UserModelInterface';
import appendDates from '../shared/appendDates';
import appendControl from '../shared/appendUsers';

const mongooseSlugs = require('mongoose-url-slugs');
const saltRounds = 10;

let userSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    max: 25,
    min: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  rememberToken: String,
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// hashes the user password
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;

    next();
  });
});
userSchema.pre('save', appendDates);
userSchema.pre('save', appendControl);

userSchema.plugin(mongooseSlugs('name'));

export default mongoose.model<UserModelInterface>('User', userSchema);
