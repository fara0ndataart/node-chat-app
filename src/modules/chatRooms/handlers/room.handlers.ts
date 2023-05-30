import { Socket } from 'socket.io';
import * as ChatService from '../chat.service';
import { eventBus } from '../../../event-bus';
import { CallbackFn } from '../../../types';

export const handleJoinRoomAction = async (socket: Socket, msg: string, onSocketDestroyed: (cb: CallbackFn) => void) => {
  const { room_id, sender_id } = socket.handshake.query;

  await ChatService.subscribeUserToAllEventsInAllUserRoom(socket, room_id as string, onSocketDestroyed)
  await ChatService.onUserJoinedRoom(room_id as string, sender_id as string, socket);

  const unsubscribe = eventBus.onSomeoneJoinedRoom(room_id as string, ChatService.handleUserJoinedRoom);
  onSocketDestroyed(unsubscribe);
};

export const handleLeaveRoomAction = async (socket: Socket, msg: string, onSocketDestroyed: (cb: CallbackFn) => void) => {
  const { room_id, sender_id } = socket.handshake.query;

  await ChatService.onUserLeftRoom(room_id as string, sender_id as string);
  const unsubscribe = eventBus.onSomeoneLeftRoom(room_id as string, ChatService.handleUserLeftRoom);
  onSocketDestroyed(unsubscribe);
};

export const handleSendMessageAction = async (socket: Socket, text: string, onSocketDestroyed: (cb: CallbackFn) => void) => {
  const { room_id, sender_id, receiver_id } = socket.handshake.query;

  await ChatService.onUserSentMessage(room_id as string, sender_id as string, receiver_id as string, text);
  const unsubscribe = eventBus.onSomeoneWroteInRoom(room_id as string, ChatService.handleUserWroteInRoom);
  onSocketDestroyed(unsubscribe);
};

export const handleUpdateMessageAction = async (socket: Socket, msg: string, onSocketDestroyed: (cb: CallbackFn) => void) => {
  const { room_id, message_id } = socket.handshake.query;

  await ChatService.onUserUpdatedMessage(room_id as string, message_id as string, msg);
  const unsubscribe = eventBus.onSomeoneUpdatedMessageInRoom(room_id as string, ChatService.handleUserUpdatedMessageInRoom);
  onSocketDestroyed(unsubscribe);
};

export const handleDeleteMessageAction = async (socket: Socket, msg: string, onSocketDestroyed: (cb: CallbackFn) => void) => {
  const { room_id, message_id } = socket.handshake.query;

  await ChatService.onUserDeletedMessage(room_id as string, message_id as string);
  const unsubscribe = eventBus.onSomeoneDeletedMessageInRoom(room_id as string, ChatService.handleUserDeletedMessageInRoom);
  onSocketDestroyed(unsubscribe);
};
