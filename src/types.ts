export type CallbackFn = () => void;

export type User = {
  id?: number,
  email?: string,
  password?: string
}

export interface PairTokens {
  token: string,
  refreshToken: string
}

export interface Message {
  id: string;
  from: {
    id: number;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
  to: {
    id: number;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
  } | null;
  text: string;
  created_at: string;
  updated_at: string;
}

export type UserRoomActionDTO = {
  roomId: string,
  userId: string,
  messages: any[]
}

export type UserRoomActionCb = (Payload: UserRoomActionDTO) => void;
