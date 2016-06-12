import * as mongoose from 'mongoose';
import { ControlInterface } from '../shared/interfaces/ControlInterface';
import { UserModelInterface } from './UserModelInterface';
import appendDates from '../shared/appendDates';

let userSchema: mongoose.Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  remember_token: String,
  control: {
    type: ControlInterface,
    required: true
  }
});

userSchema.pre('save', appendDates);

export let User = mongoose.model<UserModelInterface>('User', userSchema);
