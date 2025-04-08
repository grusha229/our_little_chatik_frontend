import { setConnectionStatus } from "@app/store/features/websocket";
import { store } from "@app/store/store";

// services/websocketService.ts
class WebSocketService {
  private socket: WebSocket | null = null;
  private pingInterval: NodeJS.Timeout | null = null;

  // Подключение к WebSocket
  connect(url: string, token: string) {
    console.log('connecting WebSocket ...', this.socket)
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log('WebSocket is already connected');
      this.socket.close();
    }

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      const date = new Date()
      console.log('WebSocket connected',date.toLocaleString('ru-RU'));
      this.send({ token }); // Отправляем токен при установке соединения
      this.startPing();

      store.dispatch(setConnectionStatus(true));
    };

    this.socket.onmessage = (event) => {
      console.log('Message from server:', event.data);

      const message = JSON.parse(event.data);
      store.dispatch({
        type: 'websocket/receiveMessage',
        payload: message,
      });
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);

      console.log('try to reconnect WebSocket ...')
      this.connect(url, token);
    };

    this.socket.onclose = () => {
      const date = new Date()
      console.log('WebSocket closed', date.toLocaleString('ru-RU'));

      this.stopPing();
      store.dispatch(setConnectionStatus(false));
    };
  }

  private startPing() {
    this.stopPing();
    this.pingInterval = setInterval(() => {
      this.send({ type: "ping", message: "check" });
      console.log('Sent ping to WebSocket');
    }, 10000);
  }
  
  private stopPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
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
    this.stopPing();
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export const websocketService = new WebSocketService();
