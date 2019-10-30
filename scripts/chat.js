class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chatrooms = db.collection('chatrooms');
    this.unsub;
  }
  async addChat(message) {
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    const response = await this.chatrooms.add(chat);
    return response;
  }
  getChats(callback) {
    this.unsub = this.chatrooms
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            // update UI
            callback(change.doc.data());
          }
        });
      });
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem('username', username);
  }
  updateRoom(room) {
    this.room = room;
    if(this.unsub){
      this.unsub();
    }
  }
  getRoom() {
    return this.room;
  }
  getUsername(){
    return this.username;
  }
}