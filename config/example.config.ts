const url = 'http://localhost';

export default {
  env: 'production',
  user: {
    name: '',
    password: '',
    email: ''
  },
  url: url,
  ports: {
    frontend: 3000,
    backend: 4000
  },
  secret: 'someRandomString',
  jwtSecret: 'anotherRandomString',
  mongo: {
    development: 'mongodb://localhost:27017/deployer-dev',
    production: 'mongodb://localhost:27017/deployer-prod',
    test: 'mongodb://localhost:27017/deployer-test'
  },
  endpoints: {
    login: url + '/api/login',
    checkToken: url + '/api/checkToken',
    logs: url + '/api/logs',
    targets: url + '/api/targets'
  },
  rollbar: {
    secret: '',
    serverSecret: '',
    environment: 'production - {front|back}end'
  }
};
