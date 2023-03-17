require('dotenv').config();
const express = require('express');
const app = express();

const Sentry = require('@sentry/node');
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
Sentry.init({
    dsn: process.env.DSN,
})

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0'
    },
    apis: ["./config/swagger*.yaml"]
}
const spec = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec, {explorer: true}))


const routes = require('./routes/index.js');
app.use('/api', routes);


// https://github.com/IbadT/task4.git

app.listen(parseInt(process.env.PORT), () => console.log('🚀 Server is started...'))