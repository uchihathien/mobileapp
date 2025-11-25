import http from 'http';
import app from './app.js';
import { initChatSocket } from './socket/chat.socket.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
initChatSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
