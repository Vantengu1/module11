const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', (ws) => {
    console.log('New connection compleat.');
    ws.on('message', (message) => {
        console.log(`Message received: ${message}`);
        ws.send(`User: ${message}`);
    });
    ws.send('Welcom on WebSocket server!');
})

console.log('WebSocket server started on localhost:8080.')