import { Model } from 'objection';
import ChatModel from '../chatRooms/chat.model';
import MessageModel from '../messages/message.model';
import RoomMemberModel from '../roomMembers/room-member.model';

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

  $formatJson(json: any) {
    const user = super.$formatJson(json);

    delete user.password;

    return user;
  }

  static get relationMappings() {
    return {
      chatRooms: {
        relation: Model.HasManyRelation,
        modelClass: ChatModel,
        join: {
          from: 'users.id',
          to: 'chat_rooms.creator_id',
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
}

export default UserModel;
