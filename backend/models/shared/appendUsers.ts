import User from '../users/User';

export default function appendUsers(next) {
  // TODO: get current user
  User.findOne().exec().then(model => {
    // we need to check if the model is not null (first user)
    const id = model ? model._id : 0;

    if (!this.createdBy) {
      this.createdBy = id;
    }

    this.updatedBy = id;

    return next();
  }, err => {
    console.log('error appending user control.');
    console.log(err);

    return next(new Error(err));
  });
}
