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
  userId: string,
  messages: any[]
}

export type UserRoomActionCb = (Payload: UserRoomActionDTO) => void;
