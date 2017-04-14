require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
};

const appID = (process.env.NODE_ENV === 'production') ? 'prod_app_id' : 'dev_app_id'; // Insert seo data

const meta = [
  { name: 'description', content: 'Boilerplate site' },
  { charset: 'utf-8' },
  { property: 'fb:app_id', content: appID },
  { property: 'og:type', content: 'website' },
  { property: 'og:site_name', content: 'Artjoker boilerplate' },
  { property: 'og:locale', content: 'en_EN' },
  { property: 'og:title', content: 'Artjoker boilerplate' },
  { property: 'og:description', content: 'This is a template description' },
  { property: 'og:card', content: 'summary' },
  { property: 'og:site', content: '@artjoker' },
  { property: 'og:creator', content: '@artjoker' },
  { property: 'og:image:width', content: '200' },
  { property: 'og:image:height', content: '200' },
  { property: 'og:url', content: process.env.HOST || 'localhost' },
  { property: 'og:image', content: '/images/logo-blue.png' }
];

const apiHost = (process.env.API_HOST) ? `https://${process.env.API_HOST}` : 'http://localhost';
const apiPort = (!!(process.env.API_PORT) === true) ? `:${process.env.API_PORT}` : '';

const config = {
  targetApi: apiHost + apiPort,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  app: {
    title: 'Artjoker boilerplate',
    description: 'Artjoker react boilerplate example',
    head: { meta }
  }
};

module.exports = Object.assign(config, environment[process.env.NODE_ENV || 'development']);
