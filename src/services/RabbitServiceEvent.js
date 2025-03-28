import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const RABBITMQ_URL = process.env.RABBIT_HOST
const RABBIT_EXCHANGE = "client_event";
const RABBIT_ROUTING_KEY = "client.created";

export async function clientCreatedEvent(client) {
    try {
        console.log("📡 Conectando a RabbitMQ...");
        const connection = await amqp.connect({
            protocol: 'amqp',
            hostname: process.env.RABBIT_HOST || 'rabbitmq',
            port: 5672,
            username: process.env.RABBIT_USER || 'admin',
            password: process.env.RABBIT_PASS || 'admin'
        });
        const channel = await connection.createChannel();

        // Declarar el exchange
        await channel.assertExchange(RABBIT_EXCHANGE, "topic", { durable: true });

        // Publicar el evento
        const message = JSON.stringify(client);
        const wasSent = channel.publish(
            RABBIT_EXCHANGE,
            RABBIT_ROUTING_KEY,
            Buffer.from(message),
            { persistent: true } // Asegura que el mensaje no se pierda si RabbitMQ se reinicia
        );

        if (wasSent) {
            console.log(`📤 Mensaje enviado a Exchange "${RABBIT_EXCHANGE}" con Routing Key "${RABBIT_ROUTING_KEY}":`, message);
        } else {
            console.error("❌ Error: No se pudo enviar el mensaje.");
        }

        // Cerrar la conexión después de un pequeño retraso para asegurar el envío
        setTimeout(async () => {
            await channel.close();
            await connection.close();
            console.log("🔌 Conexión a RabbitMQ cerrada.");
        }, 500);
        
    } catch (error) {
        console.error("❌ Error enviando mensaje a RabbitMQ:", error.message);
    }
}
