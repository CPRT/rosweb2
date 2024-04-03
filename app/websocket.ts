import WebSocket from 'ws';
import { httpServer } from './app';

const webSocketServer = new WebSocket.Server({ server: httpServer });
let webSocketClients: WebSocket[] = [];

webSocketServer.on('connection', (webSocketClient) => {
    webSocketClients.push(webSocketClient);
});

export { webSocketServer, webSocketClients };