import { Model } from 'objection';
import ChatModel from './chat.model';
import UserModel from '../users/user.model';

class MessageModel extends Model {
  id!: number;
  sender_id!: number;
  receiver_id!: number;
  room_id!: number;
  text!: string;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return 'messages';
  }

  static get relationMappings() {
    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'messages.sender_id',
          to: 'users.id',
        },
      },
      receiver: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'messages.receiver_id',
          to: 'users.id',
        },
      },
      chatRoom: {
        relation: Model.BelongsToOneRelation,
        modelClass: ChatModel,
        join: {
          from: 'messages.room_id',
          to: 'chat_rooms.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['sender_id', 'receiver_id', 'room_id', 'text'],
      properties: {
        id: { type: 'integer' },
        sender_id: { type: 'integer' },
        receiver_id: { type: 'integer' },
        room_id: { type: 'integer' },
        text: { type: 'string', minLength: 1, maxLength: 255 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }
}

export default MessageModel;
