const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', (ws) => {
    console.log('New connection compleat.');
    ws.on('message', (message) => {
        let parseMessage;
        try {
            parseMessage = JSON.parse(message);
            console.log('Получено сообщение:' .parseMessage);
        } catch (e) {
            console.log('Получено некоректное сообщение');
            return
        }

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(parseMessage));
            }
        })
    });
    ws.send(JSON.stringify({
        type: 'system',
        content: 'Welcom on CHAT-01!'
    }));
    ws.on('close', () => {
        console.log('Клиент отключился!');
    })
})

console.log('WebSocket server started on localhost:8080.')
