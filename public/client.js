const socket = io();

let Name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");

do {
  Name = prompt("Please enter your Name: ");
} while (!Name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: Name,
    message: message.trim(),
  };
  // Append
  if(msg.message != ""){
    appendMessage(msg, "outgoing_message");
  }
  
  textarea.value = "";
  scrollToBottom();

  // Send to server via the socket connection
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  let markup = `
    <h4>${msg.user}</h4> 
    <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Recieve Messages

// message is the same event name which is written in broadcast
socket.on("message", (msg) => {
    if(msg.message != ""){
        appendMessage(msg, "incoming_message");
    }
    scrollToBottom();
});

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}
