import { Socket } from 'socket.io';
import * as ChatService from '../chat.service';
import { SocketCleaner } from '../../../sockets-cleaner';
export const handleJoinRoomAction = async (socket: Socket,cleaner: SocketCleaner) => {
  const { room_id, sender_id } = socket.handshake.query;

  await ChatService.onUserJoinedRoom(room_id as string, sender_id as string, cleaner);
};

export const handleLeaveRoomAction = async (socket: Socket, cleaner: SocketCleaner) => {
  const { room_id, sender_id } = socket.handshake.query;

  await ChatService.onUserLeftRoom(room_id as string, sender_id as string, cleaner);
};

export const handleSendMessageAction = async (socket: Socket, text: string) => {
  const { room_id, sender_id, receiver_id } = socket.handshake.query;

  await ChatService.onUserSentMessage(room_id as string, sender_id as string, receiver_id as string, text);
};

export const handleUpdateMessageAction = async (socket: Socket, msg: string) => {
  const { room_id, message_id } = socket.handshake.query;

  await ChatService.onUserUpdatedMessage(room_id as string, message_id as string, msg);
};

export const handleDeleteMessageAction = async (socket: Socket) => {
  const { room_id, message_id } = socket.handshake.query;

  await ChatService.onUserDeletedMessage(room_id as string, message_id as string);
};
