import * as mongoose from 'mongoose';
import db from '../../backend/database';
import userSeed from '../../backend/models/seeds/user.seeds';
import targetSeed from '../../backend/models/seeds/target.seeds';
import { UserModelInterface } from '../../backend/models/users/UserModelInterface';

function seed(gulp) {
  gulp.task('seeds', ['ts:compile'], () => {
    // if flag is set then we have to truncate
    let i = process.argv.indexOf('--truncate');
    let truncate = false;
    if (i > -1) {
      console.log('truncate set!');
      truncate = true;
    }

    // we connect to the database.
    db(mongoose);

    // execute the seeds and disconnect when its done.
    userSeed(truncate).then((user: UserModelInterface) => {
      console.log('User done, starting Target seeds.');
      return targetSeed(user._id, truncate);
    }).then(() => {
      console.log('Targets completed.');
    }, err => {
      console.log('error saving Targets.', err);
    }).catch(err => {
      console.log(err);
    });
  });

  console.log('seeds completed.');
  mongoose.disconnect();
}

export = seed;
