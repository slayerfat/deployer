// create a sample user
import { UserModelInterface } from '../users/UserModelInterface';
import User from '../users/User';
import { config } from '../../../config/config';

export default (truncate?: boolean) => {
  console.log('Starting user seed.');
  if (truncate === true) {
    console.log('truncating users!');
    User.find({}).remove().exec((err) => {
      if (err) {
        return console.error('error truncating the users!', err);
      }

      console.log('users truncated.');
    });
  }

  return new Promise((resolve, reject) => {
    let user: UserModelInterface = new User({
      name: config.user.name,
      password: config.user.password,
      email: config.user.email
    });

    user.save().then(() => {
      console.log('User saved successfully.');
    }, err => {
      console.error(err);

      reject(err);
    }).then(() => {
      console.log('updating user control.');
      const options = {$set: {createdBy: user._id, updatedBy: user._id}};

      user.update(options).exec().then(() => {
        console.log('update complete.');
      }, err => {
        console.error(err);

        reject(err);
      });

      resolve(user);
    });
  });
};
