import { v4 as uuidv4 } from 'uuid';
import * as UserRepository from '../users/user.repository';
import ChatModel from './chat.model';
import UserModel from '../users/user.model';
import { Message } from '../../types';
import { eventBus } from '../../constants';

export const getAllChatRooms = () => ChatModel.query();

export const getChatRoomById = (id: string) => ChatModel.query().findById(id);

export const createChatRoom = (payload: object) => ChatModel.query().insert(payload);

export const updateChatRoomById = (id: string, payload: object) => {
  const chatRoom = getChatRoomById(id);

  if (chatRoom) chatRoom.update(payload);
};

export const deleteChatRoomById = (id: string) => ChatModel.query().deleteById(id);

export const onUserJoinedRoom = async (id: string, userId: string) => {
  const chatRoom = await getChatRoomById(id as string);
  const user = await UserRepository.getUserByQuery({ id: Number(userId) });

  if (chatRoom && user) {
    const users: UserModel[] = [...chatRoom.users];
    const userExists = users.some((u: { id: number }) => u.id === user.id);

    if (!userExists) users.push(user);

    const usersConverted = JSON.stringify(users);

    await chatRoom.$query().patch({ users: usersConverted });

    eventBus.emitSomeoneJoinedRoom(id, userId)
  }
};

export const onUserLeftRoom = async (id: string, userId: string) => {
  eventBus.emitSomeoneLeftRoom(id, userId)
}

export const onUserSentMessage = async (id: string, userId: string, msg: string) => {
  const chatRoom = await getChatRoomById(id as string);
  const user = await UserRepository.getUserByQuery({ id: Number(userId) });
  const message = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    from: user,
    to: null,
    text: msg,
  };

  if (chatRoom && user && message) {
    const messages = [...chatRoom.messages];

    messages.push(message);

    const messagesConverted = JSON.stringify(messages);

    await updateChatRoomById(id, { messages: messagesConverted })
    eventBus.emitSomeoneWroteInRoom(id, userId, messages)
  }
};

export const onUserUpdatedMessage = async (id: string, userId: string, messageId: string, msg: string) => {
  const messages = <M extends Message>(chatRoomMessages: M[]): M[] => {
    return chatRoomMessages.map(message => {
      if (message.id === messageId) {
        return {
          ...message,
          text: msg,
        };
      } else {
        return message;
      }
    });
  };
  const messagesConverted = JSON.stringify(messages);

  await updateChatRoomById(id, { messages: messagesConverted });
  eventBus.emitSomeoneUpdatedMessageInRoom(id)
};

export const onUserDeletedMessage = async (id: string, userId: string, messageId: string) => {
  const messages = <M extends Message>(chatRoomMessages: M[]): M[] =>
    chatRoomMessages.filter(message => message.id !== messageId);
  const messagesConverted = JSON.stringify(messages);

  await updateChatRoomById(id, { messages: messagesConverted });
  eventBus.emitSomeoneDeletedMessageInRoom(id)
};