module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'zongheng',
      script    : 'server/app.js',
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ]
};
