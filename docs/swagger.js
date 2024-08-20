const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
  info: {
    title: 'Project Management API',
    description: 'REST API for technical test SEAL'
  },
  host: 'localhost:3000' 
};

const outputFile = './swagger-output.json';
const routes = ['../src/index.js'];

swaggerAutogen(outputFile, routes, doc);