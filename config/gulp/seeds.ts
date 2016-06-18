import * as mongoose from 'mongoose';
import db from '../../backend/database';
import userSeed from '../../backend/models/seeds/user.seeds';

function seed(gulp) {
  gulp.task('seeds', ['ts:compile'], () => {
    // if flag is set then we have to truncate
    let i = process.argv.indexOf('--truncate');
    let truncate = false;
    if (i > -1) {
      truncate = true;
    }

    // we connect to the database.
    db(mongoose);

    // execute the seeds and disconnect when its done.
    userSeed(truncate).then(() => {
      mongoose.disconnect();
    });
  });
}

export = seed;
