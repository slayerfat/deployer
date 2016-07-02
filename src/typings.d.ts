// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

/// <reference path="../typings/browser.d.ts" />
// declare var module: { id: string };
declare const Rollbar: {
  init(options: any);
  critical(message: string, err: Object);
  error(message: string, err: Object);
  warning(message: string, err: Object);
  info(message: string, err: Object);
  debug(message: string, err: Object);
  log(message: string, err: Object);
};
