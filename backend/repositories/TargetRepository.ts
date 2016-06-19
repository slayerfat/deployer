import * as mongoose from 'mongoose';
import Target from '../models/targets/Target';
import { TargetModelInterface } from '../models/targets/TargetModelInterface';
import { Gettable } from './interfaces/Gettable';
import { Settable } from './interfaces/Settable';
import { UserRepository } from './UserRepository';

export class TargetRepository implements Gettable, Settable {
  getAll(): Promise<TargetModelInterface[]> {
    return new Promise((resolve, reject) => {
      Target
        .find({})
        .sort({updatedAt: -1})
        .exec()
        .then((targets: TargetModelInterface[]) => {
          return resolve(targets);
        }, err => {
          console.log(err);

          return reject(err);
        });
    });
  }

  getOne(id: mongoose.Types.ObjectId): Promise<TargetModelInterface> {
    // TODO
    return undefined;
  }

  store(data: {name: string, commands: string}): Promise<TargetModelInterface> {
    return new Promise((resolve, reject) => {
      UserRepository.getCurrent().then(model => {
        let target = new Target(data);
        target.user = model._id;

        target.save().then(() => {
          return resolve(target);
        }, err => {
          console.log('error saving new target.');

          return reject(err);
        });
      }, err => {
        return reject(err);
      });
    });
  }

  update(id: mongoose.Types.ObjectId): Promise<TargetModelInterface> {
    // TODO
    return undefined;
  }
}
