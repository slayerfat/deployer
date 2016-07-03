import * as mongoose from 'mongoose';
import Target from '../models/targets/Target';
import { TargetModelInterface } from '../models/targets/TargetModelInterface';
import { Gettable } from './interfaces/Gettable';
import { Settable } from './interfaces/Settable';
import { Sluggable } from './interfaces/Sluggable';
import { UserRepository } from './UserRepository';
import { reporter } from '../services/reporter/singleton';

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
          resolve(target);
        }, err => {
          reporter.handleError(err);

          reject(err);
        });
      }, err => {
        reject(err);
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

        reject({message: 'no target found'});
      }, err => {
        // TODO: use morgan or similar to make log files
        reporter.handleError(err);

        reject(err);
      });
    });
  }
}
