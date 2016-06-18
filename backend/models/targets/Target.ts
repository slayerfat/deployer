import * as mongoose from 'mongoose';
import { TargetModelInterface } from './TargetModelInterface';
import appendDates from '../shared/appendDates';
import appendControl from '../shared/appendUsers';
import options from '../shared/controlSchemaPartial';

options['user'] = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
};

options['name'] = {
  type: String,
  required: true
};

options['commands'] = {
  type: String,
  required: true
};

let targetSchema: mongoose.Schema = new mongoose.Schema(options);

targetSchema.pre('save', appendDates);
targetSchema.pre('save', appendControl);

export default mongoose.model<TargetModelInterface>('Target', targetSchema);
