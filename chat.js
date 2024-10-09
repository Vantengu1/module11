
const messageForm = document.getElementById('messageForm');
const chat = document.getElementById('messageContainer');
const messageInput = document.getElementById('messageInput');

const socket = new WebSocket('ws://localhost:8080');

socket.onopen = (e) => {
    console.log('Соединение установлено');
};

socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const messageElement = document.createElement('div');
    messageElement.innerHTML = 
        `<div class="messageBlock">
        <span class="messageText">${message.message}</span>
        </div>
    `;
    if (message.type === 'system') {
        messageElement.classList.add('system-message');
    }

    messageElement.textContent = message.content;
    chat.appendChild(messageElement);
    chat.scrollTop = chat.scrollHeight;
};

socket.onclose = (event) => {
    if (event.wasClean) {
        console.log(`Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
        console.log('Соединение прервано');
    }
};

socket.onerror = (error) => {
    console.log(`Ошибка ${error.message}`);
};

messageForm.onsubmit = (e) => {
    e.preventDefault();
    if (messageInput.value) {
        const message = {
            type: "user",
            content: messageInput.value
        };
        socket.send(JSON.stringify(message));
        messageInput.value = "";
    }
};

// socket.onopen = (e) => {
//     console.log("Соединение установлено!");
// }

// socket.onmessage = (event) => {
//     const message = JSON.parse(event.data);
//     const messageElement = document.createElement('div');

//     if (message.type === 'system') {
//         messageElement.classList.add('system-message');
//     }

//     messageElement.textContent = message.content;
//     chat.appendChild(messageElement);
//     chat.scrollTop = chat.scrollHeight;
// };

// socket.onclose = (event) => {
//     if (event.wasClean) {
//         console.log(`Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
//     } else {
//         console.log('Соединение прервано.');
//     }
// }

// socket.onerror = (error) => {
//     console.log(`Ошибка ${error.message}`);
// }

// messageForm.onsubmit = (e) => {
//     e.preventDefault();
//     if (messageInput.value) {
//         const message = {
//             type: 'user',
//             content: messageInput.value
//         };
//         socket.send(JSON.stringify(message));
//         messageInput.value = '';
//     }
// };