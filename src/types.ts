import { Socket } from 'socket.io';

export type CallbackFn = () => void;

export interface User {
  id?: number,
  email?: string,
  password?: string
  role?: string
}

export interface PairTokens {
  token: string,
  refreshToken: string
}

export interface UserRoomActionDTO {
  roomId: string,
  senderId: string,
  receiverId: string,
  text: string
}

export type UserRoomActionCb = (socket: Socket, Payload: UserRoomActionDTO) => void;
