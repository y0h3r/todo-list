import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API Documentation',
      version: '1.0.0',
      description: 'API documentation for todo management',
    },
    servers: [
      {
        url: 'http://localhost:9999',
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export default swaggerSpecs;
