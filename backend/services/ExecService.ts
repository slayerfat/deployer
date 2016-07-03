import { NodeCommands } from '../models/targets/NodeCommands';
import { AppService } from './AppService';
import { reporter } from './reporter/singleton';
import { winston } from '../services/winston';

const execFile = require('child_process').execFile;

export class ExecService {

  constructor(private exec = execFile) {
  }

  /**
   * Return a promise of the commands to be executed by node.
   *
   * @param commands NodeCommands[]
   * @returns {Promise<{}>}
   */
  public run(commands: NodeCommands[]): Promise<{success: boolean, results: Object[]}[]> {
    let promises: Promise<Promise<{}>>[] = [];

    // we make an array of all the commands to then execute the promises.
    for (let i = 0; i < commands.length; i++) {
      const {bin, params, cwd}: NodeCommands = commands[i];
      promises.push(this.make(bin, params, cwd));
    }

    // we seed through the promises
    return new Promise((resolve) => {
      Promise.all(promises).then(results => {
        resolve(results);
      });
    });
  }

  /**
   * Executes the command with args.
   *
   * @param command string
   * @param args String[]
   * @param cwd string
   * @returns {Promise<{}>}
   */
  private make(command: string, args?: String[], cwd?: string): Promise<{}> {
    const start = AppService.timer();

    return new Promise((resolve) => {
      this.exec(command, args, {cwd: cwd}, (error, stdOut, stdErr) => {
        if (error) {
          winston.error('errors found trying to execute command: ', command, args.toString(), cwd, error.message);
          reporter.handleError(error);

          return resolve({success: false, error});
        }

        const end = AppService.timer(start);
        const time = `${end} ms`;

        return resolve({success: true, command, args, cwd, stdOut, stdErr, time});
      });
    });
  }
}
