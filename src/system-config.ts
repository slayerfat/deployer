// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'ng2-bootstrap': 'vendor/ng2-bootstrap',
  'ng2-table': 'vendor/ng2-table',
  'moment': 'vendor/moment/moment.js'
};

/** User packages configuration. */
const packages: any = {
  'moment': {
    format: 'cjs'
  },
  'vendor/ng2-bootstrap': {
    defaultExtension: 'js'
  },
  'vendor/ng2-table': {
    defaultExtension: 'js'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/navbar',
  'app/footer',
  'app/+home',
  'app/+login',
  'app/+logout',
  'app/+dashboard',
  'app/+logs',
  'app/+logs/shared',
  'app/+logs/shared/+details',
  'app/+logs/shared/+list',
  'app/+targets',
  'app/+targets/shared',
  'app/+targets/shared/+targets-list',
  'app/+targets/shared/+targets-details',
  'app/shared',
  'app/shared/components/form-error',
  'app/shared/components/default-table',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = {main: 'index'};
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({map, packages});
