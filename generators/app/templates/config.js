const milieu = require('milieu');

const config = milieu('<%= serverName %>', {
  environment: 'dev',
  server: {
    port: 8080
  },
  mongo: {
    url: 'mongodb://localhost/<%= databaseName %>'
  }
});


module.exports = config;
