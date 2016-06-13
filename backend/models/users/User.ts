import * as mongoose from 'mongoose';
import { UserModelInterface } from './UserModelInterface';
import appendDates from '../shared/appendDates';

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
  control: {
    type: Object, // TODO: check if can be ControlInterface
    required: true
  }
});

userSchema.pre('save', appendDates);

export default mongoose.model<UserModelInterface>('User', userSchema);
