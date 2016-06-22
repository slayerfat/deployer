import * as mongoose from 'mongoose';
import Target from '../targets/Target';
import { targetCommands as commands } from './targetCommands';

export default (userId: mongoose.Types.ObjectId, truncate?: boolean) => {
  if (truncate === true) {
    console.log('truncating targets!');
    Target.find({}).remove().exec();
  }

  return new Promise((resolve, reject) => {
    commands.prepareTarget(userId).then(() => {
      resolve();
    }, err => {
      reject(err);
    });
  });
};
