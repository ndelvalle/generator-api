const milieu = require('milieu');

const config = milieu('<%= serverName %>', {
  environment: 'dev',
  server: {
    port: '${PORT}' || 8080
  },
  mongo: {
    url: '${MONGO_DB_URI}' || 'mongodb://localhost/<%= databaseName %>'
  }
});


module.exports = config;
