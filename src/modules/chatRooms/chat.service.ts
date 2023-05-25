import * as ChatRepository from './chat.repository';
import * as MessagesRepository from '../messages/messages.repository';
import * as RoomMembersRepository from '../roomMembers/room-members.repository';
import { eventBus } from '../../event-bus';

export const onUserJoinedRoom = async (roomId: string, userId: string) => {
  await RoomMembersRepository.addMemberToRoom({
    room_id: roomId,
    user_id: userId
  })

  // eventBus.emitSomeoneJoinedRoom(id, userId)
};

export const onUserLeftRoom = async (roomId: string, userId: string) => {
  await RoomMembersRepository.deleteRoomMemberById(roomId, userId)

  // eventBus.emitSomeoneLeftRoom(id, userId)
}

export const onUserSentMessage = async (payload: object) => {
  await MessagesRepository.createMessageInRoom(payload)

  // eventBus.emitSomeoneWroteInRoom(id, userId, messages)
};

export const onUserUpdatedMessage = async (messageId: string, text: string) => {
  await MessagesRepository.updateMessageInRoom(messageId, text);

  // eventBus.emitSomeoneUpdatedMessageInRoom(id)
};

export const onUserDeletedMessage = async (messageId: string) => {
  await MessagesRepository.deleteMessageInRoom(messageId);

  // eventBus.emitSomeoneDeletedMessageInRoom(id)
};
