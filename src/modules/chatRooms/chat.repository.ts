import ChatModel from './chat.model';

export const getAllChatRooms = () =>
  ChatModel
    .query()
    .withGraphFetched('[creator]');

export const getChatRoomById = (id: string) =>
  ChatModel
    .query()
    .findById(id)
    .withGraphFetched('[creator]');

export const createChatRoom = (payload: Pick<ChatModel, 'name' | 'creator_id'>) =>
  ChatModel
    .query()
    .insertAndFetch(payload)
    .withGraphFetched('[creator]');

export const updateChatRoomById = (id: string, name: string) =>
  ChatModel
    .query()
    .findById(id)
    .patchAndFetchById(id, { name })
    .withGraphFetched('[creator]');

export const deleteChatRoomById = (id: string) =>
  ChatModel
    .query()
    .deleteById(id);
