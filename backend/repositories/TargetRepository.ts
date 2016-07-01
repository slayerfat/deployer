import * as mongoose from 'mongoose';
import Target from '../models/targets/Target';
import { TargetModelInterface } from '../models/targets/TargetModelInterface';
import { Gettable } from './interfaces/Gettable';
import { Settable } from './interfaces/Settable';
import { Sluggable } from './interfaces/Sluggable';
import { UserRepository } from './UserRepository';

// TODO check if extends bug fails again
export class TargetRepository implements Gettable, Settable, Sluggable {
  public getAll(): Promise<TargetModelInterface[]> {
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

  public getOne(id: mongoose.Types.ObjectId): Promise<TargetModelInterface> {
    return this.getBy({_id: id});
  }

  public getBySlug(slug: String): Promise<TargetModelInterface> {
    return this.getBy({slug: slug});
  }

  public store(data: {name: string, commands: string}): Promise<TargetModelInterface> {
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

  public update(id: mongoose.Types.ObjectId): Promise<TargetModelInterface> {
    // TODO
    return undefined;
  }

  private getBy(options: {}): Promise<TargetModelInterface> {
    return new Promise((resolve, reject) => {
      Target.findOne(options).exec().then(target => {
        if (target) {
          return resolve(target);
        }

        return reject({message: 'no target found'});
      }, err => {
        // TODO: use morgan or similar to make log files
        console.log(err);

        return reject(err);
      });
    });
  }
}
