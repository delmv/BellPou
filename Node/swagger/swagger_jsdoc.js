const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');



const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BellPou API', // Title (required)
            version: '1.0.0', // Version (required)
        },
    },
    // Path to the API docs
    apis: [
        './controllers/*',
        './middlewares/Authorization.js',
        './middlewares/Identification.js',
        './middlewares/express-validator/*',
        './models/*',
        './routes/*',
    ],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
fs.writeFileSync('./swagger/spec.json', JSON.stringify(swaggerSpec));