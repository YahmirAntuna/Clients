import bodyParser from 'body-parser';
import express from 'express';
import clientsRoles from './routes/clientsRoutes.js';
import swaggerSpec from './api-docs.js';
import swaggerUI from "swagger-ui-express";


//const { conectarRabbit } = require('./rabbitmq');

const app = express();

app.use(bodyParser.json());

app.use('/api/clientes', clientsRoles);
app.use('/api-docs', swaggerUI.serve,
    swaggerUI.setup(swaggerSpec));





//conectarRabbitMQ();

export default app;