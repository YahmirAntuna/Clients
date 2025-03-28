import Cliente from '../models/client_model.js';
import { clientCreatedEvent } from '../services/RabbitServiceEvent.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

export const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Error retrieving client list', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createCliente = async (req, res) => {
    try {
        const { name, last_name, email, phone, birth_date, address } = req.body;

        if (!phone || !email || !name || !last_name) {
            return res.status(400).json({ message: 'Todos los campos obligatorios' });
        }

        const newCliente = await Cliente.create({
            name, last_name, email, phone, birth_date, address, status: 'active',
            created_at: new Date(),
        });

        // 📢 Publicar evento en RabbitMQ
        await clientCreatedEvent({
            id: newCliente.id,
            email: newCliente.email,
            phone: newCliente.phone
        });

        return res.status(201).json({
            message: 'Cliente creado correctamente',
            data: newCliente
        });

    } catch (error) {
        console.error('Error creando cliente', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { email, phone, name, last_name, address } = req.body;

    console.log("Received body:", req.body);

    try {
        console.log("Received ID:", id);
        if (!id) {
            return res.status(400).json({ message: 'Client ID is required' });
        }

        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Client not found' });
        }

        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ message: 'Email must contain @ and end with .com' });
        }

        if (phone && (!/^\d+$/.test(String(phone)) || String(phone).length !== 10)) {
            return res.status(400).json({ message: 'Phone must contain exactly 10 digits and only numbers' });
        }

        cliente.name = name || cliente.name;
        cliente.last_name = last_name || cliente.last_name;
        cliente.email = email || cliente.email;
        cliente.phone = phone || cliente.phone;
        cliente.address = address || cliente.address;

        await cliente.save();

        return res.status(200).json({ message: 'Client updated successfully', data: cliente });

    } catch (error) {
        console.error('Error updating client:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const deleteCliente = async (req, res) => {
    const { id } = req.params;

    console.log("Received ID for deletion:", id);

    try {
        if (!id) {
            return res.status(400).json({ message: 'Client ID is required' });
        }

        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Change status to "deleted" instead of physically deleting
        cliente.status = 'deleted';
        await cliente.save();

        return res.status(200).json({ message: 'Client deleted successfully (status changed)' });

    } catch (error) {
        console.error('Error deleting client:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
