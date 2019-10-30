// dom queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");

// add a new chat
newChatForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

newNameForm.addEventListener("submit", e => {
  e.preventDefault();
  const newName = e.target.name.value.trim();
  console.log(newName);
  chatroom.updateName(newName);
  newNameForm.reset();
  // show and hide update message
  updateMssg.innerHTML = `Your name was updated to ${newName}`;
  setTimeout(() => {
    updateMssg.innerHTML = "";
  }, 3000);
});

rooms.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    const roomName = e.target.attributes.id.nodeValue;
    chatroom.updateRoom(roomName);
    chatroom.getChats(data => {
      chatUI.render(data);
    });
  }
});

// check localStorage for username
const username = localStorage.username ? localStorage.username : "anonymous";

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);

// get chats and render
chatroom.getChats(data => {
  chatUI.render(data);
});
