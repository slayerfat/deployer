import User from '../users/User';
import { winston } from '../../services/winston';
import { reporter } from '../../services/reporter/singleton';

export default function appendUsers(next) {
  // TODO: get current user
  User.findOne().exec().then(model => {
    // we need to check if the model is not null (first user)
    const id = model ? model._id : 0;
    winston.debug(`appending control user with id ${id}`);

    if (!this.createdBy) {
      this.createdBy = id;
    }

    this.updatedBy = id;

    return next();
  }, err => {
    winston.error('error appending user control.', err.message);
    reporter.handleError(err);

    return next(new Error(err));
  });
}
