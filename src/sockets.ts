import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import config from './config';
import * as RoomHandlers from './modules/chatRooms/handlers';
import type { CallbackFn } from './types';

const unsubscribedListeners: CallbackFn[] = [];
const onSocketDestroyed = (cb: CallbackFn): void => {
  unsubscribedListeners.push(cb);
};
const handleDisconnectAction = (socket: Socket) => {
  console.log(`Client disconnected: ${socket.id}`);
  unsubscribedListeners.forEach(fn => fn());
};

const registerSocketEvents = (io: SocketIOServer) => {
  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('join-room', (msg) => RoomHandlers.handleJoinRoomAction(socket, msg, onSocketDestroyed));
    socket.on('leave-room', (msg) => RoomHandlers.handleLeaveRoomAction(socket, msg, onSocketDestroyed));
    socket.on('send-message', (msg) => RoomHandlers.handleSendMessageAction(socket, msg, onSocketDestroyed));
    socket.on('update-message', (msg) => RoomHandlers.handleUpdateMessageAction(socket, msg, onSocketDestroyed));
    socket.on('delete-message', (msg) => RoomHandlers.handleDeleteMessageAction(socket, msg, onSocketDestroyed));
    socket.on('disconnect', () => handleDisconnectAction(socket));
  });
};

export const configureSocketIO = (server: Server): SocketIOServer => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: `http://localhost:${config.port}`,
    }
  });

  registerSocketEvents(io);

  return io;
};
