import ChatModel from './chat.model';

export const getChatByUserId = (id: string, userId: string) => {
  return ChatModel.query()
    .select('*')
    .where({ id })
    .whereRaw(`messages::json->0->'from'->>'id' = ?`, userId)
    .first();
};
