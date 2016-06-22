import * as mongoose from 'mongoose';
import { TargetModelInterface } from './TargetModelInterface';
import appendDates from '../shared/appendDates';
import appendControl from '../shared/appendUsers';

let mongooseSlugs = require('mongoose-url-slugs');

let targetSchema: mongoose.Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    max: 100,
    match: /^([\w ,.'!?]{1,100})$/
  },
  commands: {
    type: Array,
    required: true,
    trim: true,
    max: 1000
  },
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

targetSchema.pre('save', appendDates);
targetSchema.pre('save', appendControl);
targetSchema.plugin(mongooseSlugs('name'));

export default mongoose.model<TargetModelInterface>('Target', targetSchema);
