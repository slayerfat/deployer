import * as mongoose from 'mongoose';
import { LogModelInterface } from './LogModelInterface';
import appendDates from '../shared/appendDates';
import appendControl from '../shared/appendUsers';

let logSchema: mongoose.Schema = new mongoose.Schema({
  target: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Target'
  },
  ip: {
    type: String,
    required: true,
    trim: true,
    max: 32
  },
  headers: {
    type: Object,
    required: true,
    trim: true,
    max: 1000
  },
  status: {
    type: Boolean,
    required: true,
    trim: true,
    max: 100
  },
  results: {
    type: Array,
    max: 1000
  },
  iteration: {
    type: Number,
    required: true
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

logSchema.pre('save', appendDates);
logSchema.pre('save', appendControl);

export default mongoose.model<LogModelInterface>('Log', logSchema);
