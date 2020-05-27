const socket = io("http://localhost:8000");



// Sara DOM hai jo connect karega
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");


// Audio hai jb koi msg behjega or connect hoga
var audio = new Audio('audio.mp3');


// Message jayega
const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if(position == 'left'){
        audio.play();
    }
}


// Tum btaoge ki kaun ho ho and kis naam se add ho rhe ho chat m
const name = prompt("Enter your name to join");
socket.emit("new-user-joined" , name);



// New user join karega koi jo server bta dega sbko pta chl jayega
socket.on("user-joined" , name =>{
    append(`${name} joined the chat` , 'right');
}) 


// Sb reveive karenge server se message
socket.on("receive" , data =>{
    append(`${data.name} : ${data.message}` , 'left');
}) 


// Koi bhi bhag gya server se toh sbko btayega
socket.on("leave" , name =>{
    append(`${name} left the chat` , 'right');
}) 


// Jb form submit ho tb server ko message behj do
form.addEventListener('submit' , (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}` , 'right')
    socket.emit('send' , message);
    messageInput.value = ''
})
