type WebSocketConnections = {
  [key: string]: WebSocket;
};

type WebsocketCallback = {
  [key: string]: (...args: unknown[]) => void;
};

class WebSocketService {
  private connections: WebSocketConnections = {};
  private callbacks: WebsocketCallback = {};

  openConnection = (
    id: string,
    url: string,
    callback: (...args: unknown[]) => void,
  ) => {
    if (this.connections[id]) {
      console.log(`Websocket connection with id ${id} already exists`);

      return;
    }

    const ws = new WebSocket(url);

    ws.addEventListener("open", () => {
      console.log(`Websocket connection ${id} opened`);
    });

    ws.addEventListener("error", (error) => {
      console.log(`Websocket error in connection ${id}:`, error);
    });

    ws.addEventListener("message", (message) => {
      this.handleMessage(id, message);
    });

    ws.addEventListener("close", () => {
      console.log(`Websocket connection ${id} closed`);
      delete this.connections[id];
    });

    this.connections[id] = ws;
    this.callbacks[id] = callback;
  };

  closeConnection = (id: string) => {
    const ws = this.connections[id];

    if (ws) {
      ws.close();
    } else {
      console.log(`No websocket connection found with id ${id}`);
    }
  };

  sendMessage = (id: string, message: unknown) => {
    const ws = this.connections[id];

    if (ws && ws.readyState === WebSocket.OPEN) {
      try {
        const payload =
          typeof message === "string" ? message : JSON.stringify(message);
        ws.send(payload);
      } catch (error) {
        console.error(`Serialization error for message to ${id}:`, error);
      }
    } else {
      console.log(`Websocket connection ${id} is not open or doesn't exist`);
    }
  };

  private handleMessage(connectionId: string, event: MessageEvent) {
    const messageData = event.data;

    if (messageData && this.callbacks[connectionId]) {
      const callback = this.callbacks[connectionId];

      if (callback && typeof callback === "function") {
        callback(messageData);
      }
    }
  }
}

export const websocketService = new WebSocketService();
