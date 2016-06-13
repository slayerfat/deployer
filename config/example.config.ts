export default {
  env: 'production',
  ports: {
    frontend: 3000,
    backend: 4000
  },
  secret: 'someRandomString',
  mongo: {
    development: 'mongodb://localhost:27017/deployer-dev',
    production: 'mongodb://localhost:27017/deployer-prod',
    test: 'mongodb://localhost:27017/deployer-test'
  }
};