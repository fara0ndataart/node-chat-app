export const createUserJoinRoomActionId = (roomId: string) => `user-joined-room-${roomId}`;
export const createUserLeaveRoomActionId = (roomId: string) => `user-left-room-${roomId}`;
export const createUserWroteInRoomActionId = (roomId: string) => `new-message-in-room-${roomId}`;
export const createUserUpdatedMessageInRoomActionId = (roomId: string) => `user-updated-message-room-${roomId}`;
export const createUserDeletedMessageInRoomActionId = (roomId: string) => `user-deleted-message-room-${roomId}`;

export const createUserJoinedRoomAction = () => `USER-JOINED-ROOM`;
export const createUserLeftRoomAction = () => `USER-LEFT-ROOM`;
export const createUserWroteInRoomAction = () => `USER-WROTE-IN-ROOM`;
export const createUserUpdatedMessageInRoomAction = () => `USER-UPDATED-MESSAGE-IN-ROOM`;
export const createUserDeletedMessageInRoomAction = () => `USER-DELETED-MESSAGE-IN-ROOM`;

