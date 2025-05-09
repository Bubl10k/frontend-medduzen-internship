class WebSocketService {
  constructor() {
    this.socket = null;
  }

  connect(url) {
    if (!this.socket) {
      this.socket = new WebSocket(url);
      console.log('Connected to WebSocket');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      console.log('Disconnected from WebSocket');
    }
  }

  on(eventName, callback) {
    if (this.socket) {
      this.socket.addEventListener(eventName, callback)
    }
  }
}

export default WebSocketService;
