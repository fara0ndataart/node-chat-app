import { EventEmitter } from 'events';
import { UserRoomActionCb, UserRoomActionDTO } from './types';
import * as chatConstants from "./modules/chatRooms/chat-constants"
import { createUserDeletedMessageInRoomActionId } from "./modules/chatRooms/chat-constants";

export class EventBus {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  private onSomeoneDidActionInRoom(roomId: string, cb: UserRoomActionCb, actionName: string) {
    this.emitter.on(actionName, cb);

    return () => this.emitter.removeListener(actionName, cb);
  }

  onSomeoneJoinedRoom(roomId: string, cb: UserRoomActionCb) {
    return this.onSomeoneDidActionInRoom(roomId, cb, chatConstants.createUserJoinRoomActionId(roomId));
  }

  emitSomeoneJoinedRoom(roomId: string, userId: string) {
    this.emitter.emit(chatConstants.createUserJoinRoomActionId(roomId), { roomId, userId } as UserRoomActionDTO);
  }

  onSomeoneLeftRoom(roomId: string, cb: UserRoomActionCb) {
    return this.onSomeoneDidActionInRoom(roomId, cb, chatConstants.createUserLeaveRoomActionId(roomId));
  }

  emitSomeoneLeftRoom(roomId: string, userId: string) {
    this.emitter.emit(chatConstants.createUserLeaveRoomActionId(roomId), { roomId, userId } as UserRoomActionDTO);
  }

  onSomeoneWroteInRoom(roomId: string, cb: UserRoomActionCb) {
    return this.onSomeoneDidActionInRoom(roomId, cb, chatConstants.createUserWroteInRoomActionId(roomId));
  }

  emitSomeoneWroteInRoom(roomId: string, userId: string, messages: any[]) {
    this.emitter.emit(chatConstants.createUserWroteInRoomActionId(roomId), {
      roomId,
      userId,
      messages
    } as UserRoomActionDTO);
  }

  onSomeoneUpdatedMessageInRoom(roomId: string, cb: UserRoomActionCb) {
    return this.onSomeoneDidActionInRoom(roomId, cb, chatConstants.createUserUpdatedMessageInRoomActionId(roomId));
  }

  emitSomeoneUpdatedMessageInRoom(roomId: string) {
    this.emitter.emit(chatConstants.createUserUpdatedMessageInRoomActionId(roomId), { roomId } as UserRoomActionDTO);
  }

  onSomeoneDeletedMessageInRoom(roomId: string, cb: UserRoomActionCb) {
    return this.onSomeoneDidActionInRoom(roomId, cb, chatConstants.createUserDeletedMessageInRoomActionId(roomId));
  }

  emitSomeoneDeletedMessageInRoom(roomId: string) {
    this.emitter.emit(chatConstants.createUserDeletedMessageInRoomActionId(roomId), { roomId } as UserRoomActionDTO);
  }
}
