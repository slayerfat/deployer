import * as mongoose from 'mongoose';
import { UserModelInterface } from './UserModelInterface';
import appendDates from '../shared/appendDates';
import appendControl from '../shared/appendUsers';

let userSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  remember_token: String,
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

userSchema.pre('save', appendDates);
userSchema.pre('save', appendControl);

export default mongoose.model<UserModelInterface>('User', userSchema);
