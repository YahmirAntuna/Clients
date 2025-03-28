import express from "express";
import { getClientes, createCliente, updateCliente, deleteCliente } from "../controllers/controller.js";

const routes = express.Router();

// Rutas principales
routes.get('/all', getClientes);
routes.post('/', createCliente);
routes.patch('/:id', updateCliente);
routes.delete('/:id', deleteCliente);

/**
 * @swagger
 * /api/clientes/all:
 *   get:
 *     summary: Get all clients
 *     description: Retrieve a list of clients from the database
 *     tags: 
 *       - Clients
 *     responses:
 *       200:
 *         description: A list of clients
 */

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Create a new client
 *     description: Add a new client to the database
 *     tags: 
 *       - Clients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   patch:
 *     summary: Update a client
 *     description: Modify an existing client's details
 *     tags: 
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Client not found
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Delete a client (soft delete, change status)
 *     description: Change the status of a client to 'deleted' instead of removing from the database
 *     tags: 
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client to update status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client deleted successfully (status updated)
 *       404:
 *         description: Client not found
 */

export default routes;
