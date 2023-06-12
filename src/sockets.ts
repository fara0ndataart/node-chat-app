import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import config from './config';
import * as RoomHandlers from './modules/chatRooms/handlers';
import { SocketCleaner } from './sockets-cleaner';
import { subscribeUserToAllEventsInAllRooms } from './modules/chatRooms/chat.service'
const handleDisconnectAction = async (cleaner: SocketCleaner) => await cleaner.cleanupAll();
const registerSocketEvents = (io: SocketIOServer) => {
  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('join-room', () => RoomHandlers.handleJoinRoomAction(socket, cleaner));
    socket.on('leave-room', () => RoomHandlers.handleLeaveRoomAction(socket, cleaner));
    socket.on('send-message', (msg) => RoomHandlers.handleSendMessageAction(socket, msg));
    socket.on('update-message', (msg) => RoomHandlers.handleUpdateMessageAction(socket, msg));
    socket.on('delete-message', () => RoomHandlers.handleDeleteMessageAction(socket));
    socket.on('disconnect', () => handleDisconnectAction(cleaner));
  });
};
export const configureSocketIO = (server: Server): SocketIOServer => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: `http://localhost:${config.port}`,
    },
  });

  registerSocketEvents(io);

  return io;
};
