import Target from '../targets/Target';
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import { NodeCommands } from '../targets/NodeCommands';

declare type targetCommandsTargets = {
  name: string,
  commands?: NodeCommands,
  dir?: string,
  gitUrl?: string,
  extra?: NodeCommands[]
};

export let targetCommands = {
  initialCommands: [
    {
      bin: 'whoami',
      params: null,
      cwd: null
    }
  ],
  targets: [
    {
      name: 'Deployer',
      commands: {
        bin: 'git',
        params: ['pull'],
        cwd: '/var/www/deployer'
      },
      dir: null,
    },
    {
      name: 'Orbiagro',
      commands: null,
      dir: '/var/www/orbiagro.com.ve',
      gitUrl: 'git@github.com:slayerfat/orbiagro.com.ve.git',
      extra: [
        {
          bin: 'wget',
          params: [
            'http://i.imgur.com/i0YU4Zt.gif',
            '--output-document=sin_imagen.gif'
          ],
          cwd: '/var/www/orbiagro.com.ve'
        },
        {
          bin: 'gulp',
          params: ['copy-app-files'],
          cwd: '/var/www/orbiagro.com.ve'
        },
        {
          bin: 'gulp',
          params: ['--production'],
          cwd: '/var/www/orbiagro.com.ve'
        },
      ]
    },
    {
      name: 'Slayerfat\'s blog',
      commands: null,
      dir: '/var/www/slayerfat.com.ve',
      gitUrl: 'git@github.com:slayerfat/slayerfat.com.ve.git',
      extra: [
        {
          bin: 'touch',
          params: ['/var/www/slayerfat.com.ve/database/database.sqlite'],
          cwd: '/var/www/orbiagro.com.ve'
        },
        {
          bin: 'gulp',
          params: ['--production'],
          cwd: '/var/www/orbiagro.com.ve'
        }
      ]
    },
    {
      name: 'Certificador',
      commands: null,
      dir: '/var/www/certificador',
      gitUrl: 'git@github.com:slayerfat/certificador.git',
      extra: [
        {
          bin: 'gulp',
          params: ['--production'],
          cwd: '/var/www/orbiagro.com.ve'
        }
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
    let {name, dir, gitUrl = null, extra} = data;
    console.log(`making commands of ${name}.`);

    if (!gitUrl) {
      console.log(`${name} has no git url.`);
      commands = commands.concat(
        this.checkOrCreateDir(dir, gitUrl),
        this.getGenericCommands(dir)
      );
    } else {
      console.log(`${name} has git url.`);
      commands = commands.concat(this.getGenericCommands(dir));
    }

    if (extra.length > 0) {
      console.log('extra commands found');
      commands = commands.concat(extra);
    }

    console.log(`commands of ${name} created successfully`);
    return commands;
  },

  checkOrCreateDir(dir: string, gitUrl: string) {
    let isDir = [
      {
        bin: 'git',
        params: ['pull'],
        cwd: dir
      }
    ];

    let noDir = [
      {
        bin: 'git',
        params: ['clone', `${gitUrl}`, `${dir}`],
        cwd: dir
      },
      {
        bin: 'chmod',
        params: ['775', '-R', `${dir}/storage/`, `${dir}/bootstrap/cache/`],
        cwd: dir
      },
      {
        bin: 'chgrp',
        params: [
          'www-data',
          '-R',
          `${dir}/storage/`,
          `${dir}/bootstrap/cache/`,
          `${dir}/public/`
        ],
        cwd: dir
      },
      {
        bin: 'git',
        params: ['submodule', 'init'],
        cwd: dir
      },
      {
        bin: 'git',
        params: ['submodule', 'update'],
        cwd: dir
      },
    ];

    console.log('about to check dir.');

    return fs.stat(dir, (err, stats) => {
      console.log(`checking if ${dir} exists`);
      console.log('exists?', stats.isDirectory());
      return stats.isDirectory() ? isDir : noDir;
    });
  },

  getGenericCommands: function (dir: string) {
    return [
      {
        bin: 'git',
        params: ['git', 'status'],
        cwd: dir
      },
      {
        bin: 'git',
        params: ['submodule', 'sync'],
        cwd: dir
      },
      {
        bin: 'git',
        params: ['submodule', 'update', '--recursive'],
        cwd: dir
      },
      {
        bin: 'git',
        params: ['submodule', 'status'],
        cwd: dir
      },
      {
        bin: 'composer',
        params: ['install', '--no-interaction'],
        cwd: dir
      },
      {
        bin: 'npm',
        params: ['set', 'progress=false'],
        cwd: dir
      },
      {
        bin: 'npm',
        params: ['install'],
        cwd: dir
      },
      {
        bin: `${dir}/node_modules/bower/bin/bower`,
        params: ['install', '--silent'],
        cwd: dir
      },
    ];
  }
};
