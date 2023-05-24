import { Model } from 'objection';
import ChatModel from '../chatRooms/chat.model';
import MessageModel from '../chatRooms/message.model';
import RoomMemberModel from '../chatRooms/room-member.model';

class UserModel extends Model {
  id!: number;
  email!: string;
  password!: string;
  role!: string;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      chatRooms: {
        relation: Model.HasManyRelation,
        modelClass: ChatModel,
        join: {
          from: 'users.id',
          to: 'chat_rooms.created_by',
        },
      },
      sentMessages: {
        relation: Model.HasManyRelation,
        modelClass: MessageModel,
        join: {
          from: 'users.id',
          to: 'messages.sender_id',
        },
      },
      receivedMessages: {
        relation: Model.HasManyRelation,
        modelClass: MessageModel,
        join: {
          from: 'users.id',
          to: 'messages.receiver_id',
        },
      },
      roomMemberships: {
        relation: Model.HasManyRelation,
        modelClass: RoomMemberModel,
        join: {
          from: 'users.id',
          to: 'room_members.user_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', hidden: true, minLength: 1, maxLength: 255 },
        role: { type: 'string', enum: ['guest'], default: 'guest' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  };
}

export default UserModel;
