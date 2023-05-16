import { Socket } from 'socket.io';
import * as ChatService from '../chat.service';
import { eventBus } from '../../../constants';
import { CallbackFn, UserRoomActionCb } from '../../../types';
import * as chatConstants from '../chat-constants';

export const handleJoinRoomAction = async (socket: Socket, msg: string, onSocketDestroyed: (cb: CallbackFn) => void) => {
  const { roomId, userId } = socket.handshake.query;
  const handleUserJoinedRoom: UserRoomActionCb = ({ roomId, userId }) =>
    socket.emit(chatConstants.createUserJoinedRoomAction(), { roomId, userId });

  await ChatService.onUserJoinedRoom(roomId as string, userId as string);
  const unsubscribe = eventBus.onSomeoneJoinedRoom(roomId as string, handleUserJoinedRoom);
  onSocketDestroyed(unsubscribe);
};

export const handleLeaveRoomAction = async (socket: Socket, msg: string, onSocketDestroyed: (cb: CallbackFn) => void) => {
  const { roomId, userId } = socket.handshake.query;
  const handleUserLeftRoom: UserRoomActionCb = ({ roomId, userId }) =>
    socket.emit(chatConstants.createUserLeftRoomAction(), { roomId, userId });

  await ChatService.onUserLeftRoom(roomId as string, userId as string);
  const unsubscribe = eventBus.onSomeoneLeftRoom(roomId as string, handleUserLeftRoom);
  onSocketDestroyed(unsubscribe);
};

export const handleSendMessageAction = async (socket: Socket, msg: string, onSocketDestroyed: (cb: CallbackFn) => void) => {
  const { roomId, userId } = socket.handshake.query;
  const handleUserWroteInRoom: UserRoomActionCb = ({ roomId, userId, messages }) =>
    socket.emit(chatConstants.createUserWroteInRoomAction(), { roomId, userId, messages });

  await ChatService.onUserSentMessage(roomId as string, userId as string, msg);
  const unsubscribe = eventBus.onSomeoneWroteInRoom(roomId as string, handleUserWroteInRoom);
  onSocketDestroyed(unsubscribe);
};

export const handleUpdateMessageAction = async (socket: Socket, msg: string, onSocketDestroyed: (cb: CallbackFn) => void) => {
  const { roomId, userId, messageId } = socket.handshake.query;
  const handleUserUpdatedMessageInRoom: UserRoomActionCb = ({ roomId, userId }) =>
    socket.emit(chatConstants.createUserUpdatedMessageInRoomAction(), { roomId, userId });

  await ChatService.onUserUpdatedMessage(roomId as string, userId as string, messageId as string, msg);
  const unsubscribe = eventBus.onSomeoneUpdatedMessageInRoom(roomId as string, handleUserUpdatedMessageInRoom);
  onSocketDestroyed(unsubscribe);
};

export const handleDeleteMessageAction = async (socket: Socket, msg: string, onSocketDestroyed: (cb: CallbackFn) => void) => {
  const { roomId, userId, messageId } = socket.handshake.query;
  const handleUserUpdatedMessageInRoom: UserRoomActionCb = ({ roomId, userId }) =>
    socket.emit(chatConstants.createUserDeletedMessageInRoomAction(), { roomId, userId });

  await ChatService.onUserDeletedMessage(roomId as string, userId as string, messageId as string);
  const unsubscribe = eventBus.onSomeoneDeletedMessageInRoom(roomId as string, handleUserUpdatedMessageInRoom);
  onSocketDestroyed(unsubscribe);
};
