import MessageModel from './message.model';

export const getAllMessagesInRoom = (roomId: string) =>
  MessageModel
    .query()
    .where('room_id', roomId)
    .withGraphFetched('[sender, receiver, chatRoom]');

export const createMessageInRoom = (payload: object) =>
  MessageModel
    .query()
    .insertAndFetch(payload)
    .withGraphFetched('[sender, receiver, chatRoom]');

export const updateMessageInRoom = (id: string, text: string) =>
  MessageModel
    .query()
    .findById(id)
    .patchAndFetchById(id, { text })
    .withGraphFetched('[sender, receiver, chatRoom]');

export const deleteMessageInRoom = (id: string) =>
  MessageModel
    .query()
    .deleteById(id)
