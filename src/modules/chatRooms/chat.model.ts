import { Model } from 'objection';
import UserModel from '../users/user.model';
import RoomMemberModel from '../roomMembers/room-member.model';
import MessageModel from '../messages/message.model';

class ChatModel extends Model {
  id!: number;
  name!: string;
  creator_id?: number;
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
          from: 'chat_rooms.creator_id',
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
}

export default ChatModel;
