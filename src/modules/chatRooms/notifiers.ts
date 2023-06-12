import { UserRoomActionCb } from '../../types';
import * as chatConstants from './chat-constants';
import { Socket } from 'socket.io';

export const notifyUsersThatUserJoinedRoom = (): UserRoomActionCb => (socket: Socket, { roomId, senderId }) =>
  socket.emit(chatConstants.createUserJoinedRoomAction(), { roomId, senderId });

export const notifyUsersThatUserLeftRoom = (): UserRoomActionCb => (socket: Socket, { roomId, senderId }) =>
  socket.emit(chatConstants.createUserLeftRoomAction(), { roomId, senderId });

export const notifyUsersThatUserWroteInRoom = (): UserRoomActionCb => (socket: Socket, { roomId, senderId, text }) =>
  socket.emit(chatConstants.createUserWroteInRoomAction(), { roomId, senderId, text });

export const notifyUsersThatUserUpdatedMessageInRoom = (): UserRoomActionCb => (socket: Socket, { roomId, senderId }) =>
  socket.emit(chatConstants.createUserUpdatedMessageInRoomAction(), { roomId, senderId });

export const notifyUsersThatUserDeletedMessageInRoom = (): UserRoomActionCb => (socket: Socket, { roomId, senderId }) =>
  socket.emit(chatConstants.createUserDeletedMessageInRoomAction(), { roomId, senderId });
