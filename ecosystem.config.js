module.exports = {
  apps : [{
    script: 'out/app.js',
    watch: '.'
  }],

  deploy : {
    production : {
      user : 'debian',
      host : '51.178.45.66',
      ref  : 'origin/main',
      repo : 'git@github.com:BillyRonico412/action-verite-back.git',
      path : '/home/debian/pm2-deploy/action-verite',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
