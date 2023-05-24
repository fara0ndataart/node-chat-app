import { Model } from 'objection';
import UserModel from '../users/user.model';
import RoomMemberModel from './room-member.model';
import MessageModel from './message.model';

class ChatModel extends Model {
  id!: number;
  name!: string;
  created_by?: number;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return 'chat_rooms';
  }

  static get relationMappings() {
    return {
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'chat_rooms.created_by',
          to: 'users.id',
        },
      },
      roomMembers: {
        relation: Model.HasManyRelation,
        modelClass: RoomMemberModel,
        join: {
          from: 'chat_rooms.id',
          to: 'room_members.room_id',
        },
      },
      messages: {
        relation: Model.HasManyRelation,
        modelClass: MessageModel,
        join: {
          from: 'chat_rooms.id',
          to: 'messages.room_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        created_by: { type: ['integer', 'null'] },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }
}

export default ChatModel;
