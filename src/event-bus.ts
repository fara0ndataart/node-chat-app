import { EventEmitter } from 'events';
import { UserRoomActionCb, UserRoomActionDTO } from './types';
import * as chatConstants from './modules/chatRooms/chat-constants';
import { SocketCleaner } from './sockets-cleaner';

class EventBus {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  private onSomeoneDidActionInRoom(cb: UserRoomActionCb, actionName: string) {
    this.emitter.on(actionName, cb);

    return () => this.emitter.removeListener(actionName, cb);
  }

  onSomeoneJoinedRoom(roomId: string | number, cb: UserRoomActionCb, cleaner: SocketCleaner) {
    const action = chatConstants.createUserJoinRoomActionId(roomId);
    const clean = this.onSomeoneDidActionInRoom(cb, action);

    cleaner.registerCleaner(action, clean)

    return clean
  }

  emitSomeoneJoinedRoom(roomId: string | number, senderId: string) {
    this.emitter.emit(chatConstants.createUserJoinRoomActionId(roomId), { roomId, senderId } as UserRoomActionDTO);
  }

  onSomeoneLeftRoom(roomId: string | number, cb: UserRoomActionCb) {
    return this.onSomeoneDidActionInRoom(cb, chatConstants.createUserLeaveRoomActionId(roomId));
  }

  emitSomeoneLeftRoom(roomId: string | number, senderId: string) {
    this.emitter.emit(chatConstants.createUserLeaveRoomActionId(roomId), { roomId, senderId } as UserRoomActionDTO);
  }

  onSomeoneWroteInRoom(roomId: string | number, cb: UserRoomActionCb) {
    return this.onSomeoneDidActionInRoom(cb, chatConstants.createUserWroteInRoomActionId(roomId));
  }

  emitSomeoneWroteInRoom(roomId: string | number, senderId: string, receiverId: string, text: string) {
    this.emitter.emit(chatConstants.createUserWroteInRoomActionId(roomId), {
      roomId,
      senderId,
      receiverId,
      text,
    } as UserRoomActionDTO);
  }

  onSomeoneUpdatedMessageInRoom(roomId: string | number, cb: UserRoomActionCb) {
    return this.onSomeoneDidActionInRoom(cb, chatConstants.createUserUpdatedMessageInRoomActionId(roomId));
  }

  emitSomeoneUpdatedMessageInRoom(roomId: string | number) {
    this.emitter.emit(chatConstants.createUserUpdatedMessageInRoomActionId(roomId), { roomId } as UserRoomActionDTO);
  }

  onSomeoneDeletedMessageInRoom(roomId: string | number, cb: UserRoomActionCb) {
    return this.onSomeoneDidActionInRoom(cb, chatConstants.createUserDeletedMessageInRoomActionId(roomId));
  }

  emitSomeoneDeletedMessageInRoom(roomId: string | number) {
    this.emitter.emit(chatConstants.createUserDeletedMessageInRoomActionId(roomId), { roomId } as UserRoomActionDTO);
  }
}

export const eventBus = new EventBus();
