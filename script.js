"use strick"

let messages = JSON.parse(localStorage.getItem('messages')) || [];

const messageForm = document.getElementById('messageForm');
const messageDiv = document.getElementById('messageContainer');

function saveMessage() {
    localStorage.setItem('messages', JSON.stringify(messages));
}

function renderMessage(){
    messageDiv.innerHTML = '';
    messages.forEach((message, index) => {
        const div = document.createElement('div');
        div.innerHTML = 
        `<div class="messageBlock">
        <span class="messageText">${message.message}</span>
        </div>
    `;
    messageDiv.appendChild(div);
    });
};

function  addMessage(event) {
    event.preventDefault();
    const newMessage = {
        message: document.getElementById('messageInput').value
    };
    messages.unshift(newMessage);
    saveMessage();
    renderMessage();
    messageForm.reset();
}

// messageForm.addEventListener('submit', addMessage);

// renderMessage();

//HOST 8080
const socket = new WebSocket('ws:localhost:8080');

socket.addEventListener('open', function (e){
    console.log('Connect compleat');
});
socket.addEventListener('close', function (e){
    console.log('Connect finished');
});

socket.addEventListener('message', renderMessage());

messageForm.addEventListener('submit', addMessage);

renderMessage();
// document.getElementById('btnSendMessage').addEventListener('click', () => {
//     event.preventDefault();
//     const text = addMessage.value;
//     socket.send(text);
//     saveMessage();
// })