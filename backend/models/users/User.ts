import * as mongoose from 'mongoose';
import { UserModelInterface } from './UserModelInterface';
import appendDates from '../shared/appendDates';
import appendControl from '../shared/appendUsers';
import options from '../shared/controlSchemaPartial';

options['name'] = {
  type: String,
  required: true,
  unique: true
};

options['email'] = {
  type: String,
  required: true,
  unique: true
};

options['password'] = {
  type: String,
  required: true
};

options['remember_token'] = {
  type: String
};

let userSchema: mongoose.Schema = new mongoose.Schema(options);

userSchema.pre('save', appendDates);
userSchema.pre('save', appendControl);

export default mongoose.model<UserModelInterface>('User', userSchema);
