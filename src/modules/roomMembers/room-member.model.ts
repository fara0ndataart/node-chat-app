import { Model } from 'objection';
import ChatModel from '../chatRooms/chat.model';
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
}

export default RoomMemberModel;
