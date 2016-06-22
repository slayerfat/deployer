const execFile = require('child_process').execFile;

export class ExecService {

  constructor(private exec = execFile) {
  }

  run(command: string, args?: String[], cwd?: string) {
    this.exec(command, args, {cwd: cwd}, (error, stdOut, stdErr) => {
      if (error) {
        console.log('errors found: ', command, args, cwd, error.message);
        throw error;
      }

      console.log(stdOut);
      console.log(stdErr);
    });
  }
}
