import { Model } from 'objection';

class UserModel extends Model {
  static get tableName() {
    return 'users';
  }

  id!: number;
  email!: string;
  password!: string;
  role!: string;

  $formatJson(json: any) {
    const user = super.$formatJson(json);

    delete user.password;

    return user;
  }
}

export default UserModel;
