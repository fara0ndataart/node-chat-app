import * as MessagesRepository from '../messages/messages.repository';
import * as RoomMembersRepository from '../roomMembers/room-members.repository';
import { eventBus } from '../../event-bus';
import * as chatConstants from './chat-constants';
import { SocketCleaner } from '../../sockets-cleaner';
import * as notifiers from './notifiers';

export const subscribeUserToAllEventsInAllRooms = async (userId: string, cleaner: SocketCleaner) => {
  const rooms = await RoomMembersRepository.getAllJoinedRoomsByUserId(userId);
  const roomIds = rooms.map(room => room.room_id);

  roomIds.forEach((roomId) => subscribeUserToAllEventsInRoom(userId,roomId, cleaner));
};

export const handleUserJoinedRoom: UserRoomActionCb = (socket, { roomId, senderId }) =>
  socket.emit(chatConstants.createUserJoinedRoomAction(), { roomId, senderId });

export const handleUserLeftRoom: UserRoomActionCb = (socket, { roomId, senderId }) =>
  socket.emit(chatConstants.createUserLeftRoomAction(), { roomId, senderId });

export const handleUserWroteInRoom: UserRoomActionCb = (socket, { roomId, senderId, text }) =>
  socket.emit(chatConstants.createUserWroteInRoomAction(), { roomId, senderId, text });

export const handleUserUpdatedMessageInRoom: UserRoomActionCb = (socket, { roomId, senderId }) =>
  socket.emit(chatConstants.createUserUpdatedMessageInRoomAction(), { roomId, senderId });

export const handleUserDeletedMessageInRoom: UserRoomActionCb = (socket, { roomId, senderId }) =>
  socket.emit(chatConstants.createUserDeletedMessageInRoomAction(), { roomId, senderId });

export const onUserJoinedRoom = async (room_id: string, user_id: string, cleaner: SocketCleaner) => {
  try {
    const isMember = await RoomMembersRepository.getRoomMemberById(user_id);

    if (!isMember) {
      await RoomMembersRepository.addMemberToRoom({
        room_id,
        user_id,
      });
    }

    eventBus.emitSomeoneJoinedRoom(room_id, user_id)
  } catch (error) {
    throw error;
  }
};

export const onUserLeftRoom = async (room_id: string, user_id: string) => {
  try {
    await RoomMembersRepository.deleteRoomMemberById(room_id, user_id);

    eventBus.emitSomeoneLeftRoom(room_id, user_id)
  } catch (error) {
    throw error;
  }
};
export const onUserSentMessage = async (room_id: string, sender_id: string, receiver_id: string, text: string) => {
  const payload = {
    room_id,
    sender_id,
    receiver_id,
    text
  }

  try {
    await MessagesRepository.createMessageInRoom(payload);

    eventBus.emitSomeoneWroteInRoom(room_id, sender_id, receiver_id, text);
  } catch (error) {
    throw error;
  }
};

export const onUserUpdatedMessage = async (room_id: string, message_id: string, text: string) => {
  try {
    await MessagesRepository.updateMessageInRoom(message_id, text);

    eventBus.emitSomeoneUpdatedMessageInRoom(room_id);
  } catch (error) {
    throw error;
  }
};

export const onUserDeletedMessage = async (room_id: string, message_id: string) => {
  try {
    await MessagesRepository.deleteMessageInRoom(message_id);

    eventBus.emitSomeoneDeletedMessageInRoom(room_id);
  } catch (error) {
    throw error;
  }
};
