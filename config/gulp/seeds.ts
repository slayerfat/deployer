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
    db(mongoose).then(() => {
      // execute the seeds and disconnect when its done.
      return userSeed(truncate);
    }).then((user: UserModelInterface) => {
      console.log('User done, starting Target seeds.');

      return targetSeed(user._id, truncate);
    }, err => {
      console.error('error seeding user!', err);
    }).then(() => {
      return console.log('Targets completed.');
    }, err => {
      console.error('error saving Targets.', err);
    }).then(() => {
      console.log('seeds completed.');

      return process.exit(0);
    }).catch(err => {
      console.error(err);
    });
  });
}

export = seed;
