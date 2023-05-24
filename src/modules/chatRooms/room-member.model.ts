import { Model } from 'objection';
import ChatModel from './chat.model';
import UserModel from '../users/user.model';

class RoomMemberModel extends Model {
  id!: number;
  room_id!: number;
  user_id!: number;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return 'room_members';
  }

  static get relationMappings() {
    return {
      chatRoom: {
        relation: Model.BelongsToOneRelation,
        modelClass: ChatModel,
        join: {
          from: 'room_members.room_id',
          to: 'chat_rooms.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'room_members.user_id',
          to: 'users.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['room_id', 'user_id'],
      properties: {
        id: { type: 'integer' },
        room_id: { type: 'integer' },
        user_id: { type: 'integer' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }
}

export default RoomMemberModel;
