import { Model } from 'objection';
import ChatModel from '../chatRooms/chat.model';
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
}

export default MessageModel;
