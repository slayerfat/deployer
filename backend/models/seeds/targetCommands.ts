import Target from '../targets/Target';
import * as fs from 'fs';
import * as mongoose from 'mongoose';

declare type targetCommandsTargets = {
  name: string,
  commands: string[],
  dir?: string,
  gitUrl?: string,
  extra?: string[]
};

export let targetCommands = {
  initialCommands: [
    'echo $PWD',
    'whoami',
  ],
  targets: [
    {
      name: 'Deployer',
      'commands': ['git pull 2>&1'],
      'dir': null,
    },
    {
      name: 'Orbiagro',
      commands: null,
      dir: '/var/www/orbiagro.com.ve',
      gitUrl: 'git@github.com:slayerfat/orbiagro.com.ve.git',
      extra: [
        '(cd /var/www/orbiagro.com.ve/public/ && '
        + 'wget http://i.imgur.com/i0YU4Zt.gif --output-document=sin_imagen.gif 2>&1)',
        '(cd /var/www/orbiagro.com.ve && '
        + '/var/www/orbiagro.com.ve/node_modules/gulp/bin/gulp.js copy-app-files 2>&1)',
        '(cd /var/www/orbiagro.com.ve && '
        + '/var/www/orbiagro.com.ve/node_modules/gulp/bin/gulp.js --production 2>&1)'
      ]
    },
    {
      name: 'Slayerfat\'s blog',
      commands: null,
      dir: '/var/www/slayerfat.com.ve',
      gitUrl: 'git@github.com:slayerfat/slayerfat.com.ve.git',
      extra: [
        '(if ! test -e "/var/www/slayerfat.com.ve/database/database.sqlite";then '
        + 'touch /var/www/slayerfat.com.ve/database/database.sqlite; fi 2>&1)',
        '(cd /var/www/slayerfat.com.ve && '
        + '/var/www/slayerfat.com.ve/node_modules/gulp/bin/gulp.js --production 2>&1)'
      ]
    },
    {
      name: 'Certificador',
      commands: null,
      dir: '/var/www/certificador',
      gitUrl: 'git@github.com:slayerfat/certificador.git',
      extra: [
        '(cd /var/www/certificador && '
        + '/var/www/certificador/node_modules/gulp/bin/gulp.js --production 2>&1)',
      ]
    }
  ],

  prepareTarget(userId: mongoose.Types.ObjectId) {
    return new Promise((resolve, reject) => {
      this.targets.forEach((data: targetCommandsTargets) => {
        let target = new Target({
          user: userId,
          name: data.name,
          commands: data.commands || this.makeCommands(data)
        });

        target.save().then(() => {
          console.log(`target ${data.name}, saved successfully.`);
        }, err => {
          console.log(err);

          reject(err);
        });
      });

      resolve();
    });
  },

  makeCommands(data: targetCommandsTargets) {
    let commands = this.initialCommands;
    let {dir, gitUrl, extra} = data;

    if (!gitUrl) {
      commands = commands.concat(
        this.checkOrCreateDir(dir, gitUrl),
        this.getGenericCommands(dir)
      );
    } else {
      commands = commands.concat(this.getGenericCommands(dir));
    }

    if (extra.length > 0) {
      commands = commands.concat(extra);
    }

    return commands;
  },

  checkOrCreateDir(dir: string, gitUrl: string) {
    fs.stat(dir, (err, stats) => {
      return stats.isDirectory() ? [`(cd ${dir} && git pull)`] : [
        `git clone ${gitUrl} ${dir}`,
        `chmod 775 -R ${dir}/storage/ ${dir}/bootstrap/cache/`,
        `chgrp www-data -R ${dir}/storage/ ${dir}/bootstrap/cache/ ${dir}/public/`,
        `(cd ${dir} && git submodule init)`,
        `(cd ${dir} && git submodule update)`,
      ];
    });
  },

  getGenericCommands: function (dir: string) {
    return [
      `(cd ${dir} && git status)`,
      `(cd ${dir} && git submodule sync)`,
      `(cd ${dir} && git submodule update --recursive)`,
      `(cd ${dir} && git submodule status)`,
      `(cd ${dir} && composer install --no-interaction 2>&1)`,
      `(cd ${dir} && npm set progress=false && npm install 2>&1)`,
      `(cd ${dir} && ${dir}/node_modules/bower/bin/bower install --silent 2>&1)`,
    ];
  }
};
