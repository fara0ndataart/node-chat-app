import RoomMemberModel from './room-member.model';

export const getAllRoomMembers = () =>
  RoomMemberModel
    .query()
    .withGraphFetched('[chatRoom, user]');

export const getRoomMemberById = (userId: string) =>
  RoomMemberModel
    .query()
    .where('user_id', userId)
    .first()
    .withGraphFetched('[chatRoom, user]');

export const addMemberToRoom = (payload: object) =>
  RoomMemberModel
    .query()
    .insertAndFetch(payload)
    .withGraphFetched('[chatRoom, user]');

export const deleteRoomMemberById = (roomId: string, userId: string) =>
  RoomMemberModel.query()
    .where('room_id', roomId)
    .where('user_id', userId)
    .delete()
