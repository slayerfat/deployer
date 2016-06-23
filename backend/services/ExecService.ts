import { NodeCommands } from '../models/targets/NodeCommands';

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
  run(commands: NodeCommands[]): Promise<{success: boolean, results: Object[]}[]> {
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
    return new Promise((resolve) => {
      this.exec(command, args, {cwd: cwd}, (error, stdOut, stdErr) => {
        if (error) {
          // TODO: morgan
          console.log('errors found: ', command, args, cwd, error.message);

          return resolve({success: false, error});
        }

        return resolve({success: true, command, args, cwd, stdOut, stdErr});
      });
    });
  }
}
