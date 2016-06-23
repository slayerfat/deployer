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
    type: Object,
    required: true,
    trim: true,
    max: 100
  },
  results: {
    type: Array,
    max: 1000
  },
  error: {
    type: String,
    trim: true,
    max: 255
  },
  errorCode: {
    type: Number,
    max: 65535,
    min: 0
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
