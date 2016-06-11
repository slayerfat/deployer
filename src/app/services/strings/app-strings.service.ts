import { Injectable } from '@angular/core';

@Injectable()
export class AppStringsService {
  public brand = 'Deployer';
  public shortDesc= 'Deployer, it just works!';
  public repoUrl = 'https://github.com/slayerfat/deployer';
  public authors = [
    {
      fullName: 'Alejandro Granadillo',
      name: 'slayerfat',
      email: 'slayerfat@gmail.com',
      twitter: 'https://twitter.com/slayerfat',
      github: 'https://github.com/slayerfat',
      website: 'http://slayerfat.com.ve/'
    }
  ];

  constructor() {
  }
}
