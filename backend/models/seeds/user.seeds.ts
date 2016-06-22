// create a sample user
import { UserModelInterface } from '../users/UserModelInterface';
import User from '../users/User';
import { config } from '../../../config/config';

export default (truncate?: boolean) => {
  if (truncate === true) {
    User.find({}).remove().exec();
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
      console.log(err);

      return reject();
    }).then(() => {
      console.log('updating user control.');
      const options = {$set: {createdBy: user._id, updatedBy: user._id}};

      user.update(options).exec().then(() => {
        console.log('update complete.');
      }, err => {
        console.log(err);

        return reject();
      });

      return resolve(user);
    });
  });
};
