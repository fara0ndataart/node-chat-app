import { EventEmitter } from 'events';
import { UserRoomActionCb, UserRoomActionDTO } from './types';
import * as chatConstants from './modules/chatRooms/chat-constants';

class EventBus {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  private onSomeoneDidActionInRoom(cb: UserRoomActionCb, actionName: string) {
    this.emitter.on(actionName, cb);

    return () => this.emitter.removeListener(actionName, cb);
  }

  onSomeoneJoinedRoom(roomId: string, cb: UserRoomActionCb) {
    return this.onSomeoneDidActionInRoom(cb, chatConstants.createUserJoinRoomActionId(roomId));
  }

  emitSomeoneJoinedRoom(roomId: string, senderId: string) {
    this.emitter.emit(chatConstants.createUserJoinRoomActionId(roomId), { roomId, senderId } as UserRoomActionDTO);
  }

  onSomeoneLeftRoom(roomId: string, cb: UserRoomActionCb) {
    return this.onSomeoneDidActionInRoom(cb, chatConstants.createUserLeaveRoomActionId(roomId));
  }

  emitSomeoneLeftRoom(roomId: string, senderId: string) {
    this.emitter.emit(chatConstants.createUserLeaveRoomActionId(roomId), { roomId, senderId } as UserRoomActionDTO);
  }

  onSomeoneWroteInRoom(roomId: string, cb: UserRoomActionCb) {
    return this.onSomeoneDidActionInRoom(cb, chatConstants.createUserWroteInRoomActionId(roomId));
  }

  emitSomeoneWroteInRoom(roomId: string, senderId: string, receiverId: string, text: string) {
    this.emitter.emit(chatConstants.createUserWroteInRoomActionId(roomId), {
      roomId,
      senderId,
      receiverId,
      text,
    } as UserRoomActionDTO);
  }

  onSomeoneUpdatedMessageInRoom(roomId: string, cb: UserRoomActionCb) {
    return this.onSomeoneDidActionInRoom(cb, chatConstants.createUserUpdatedMessageInRoomActionId(roomId));
  }

  emitSomeoneUpdatedMessageInRoom(roomId: string) {
    this.emitter.emit(chatConstants.createUserUpdatedMessageInRoomActionId(roomId), { roomId } as UserRoomActionDTO);
  }

  onSomeoneDeletedMessageInRoom(roomId: string, cb: UserRoomActionCb) {
    return this.onSomeoneDidActionInRoom(cb, chatConstants.createUserDeletedMessageInRoomActionId(roomId));
  }

  emitSomeoneDeletedMessageInRoom(roomId: string) {
    this.emitter.emit(chatConstants.createUserDeletedMessageInRoomActionId(roomId), { roomId } as UserRoomActionDTO);
  }
}

export const eventBus = new EventBus();
