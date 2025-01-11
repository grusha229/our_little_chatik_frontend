import { store } from "../store/store";

// services/websocketService.ts
class WebSocketService {
  private socket: WebSocket | null = null;

  // Подключение к WebSocket
  connect(url: string, token: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log('WebSocket is already connected');
      return;
    }

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.send({ token }); // Отправляем токен при установке соединения
    };

    this.socket.onmessage = (event) => {
      console.log('Message from server:', event.data);

      const message = JSON.parse(event.data);

      // Диспатчим сообщение в store, чтобы обработать его в middleware
      store.dispatch({
        type: 'websocket/receiveMessage',
        payload: message,
      });
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket closed');
    };
  }

  // Отправка сообщения через WebSocket
  send(message: object) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  // Отключение WebSocket
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export const websocketService = new WebSocketService();
