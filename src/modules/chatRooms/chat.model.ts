import { Model } from 'objection';

class ChatModel extends Model {
  static get tableName() {
    return 'chat_rooms';
  }

  id!: number;
  name!: string;
  messages!: any;
  users!: any;
}

export default ChatModel;
