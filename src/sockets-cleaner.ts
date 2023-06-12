import * as constants from './modules/chatRooms/chat-constants';

export class SocketCleaner {
  cleaners: Map<string, Function[]> = new Map();

  registerCleaner(id: string, cb: Function) {
    if (!this.cleaners.has(id)) {
      this.cleaners.set(id, []);
    }
    this.cleaners.get(id)?.push(cb);
  }

  cleanById(id: string) {
    const cleaners = this.cleaners.get(id) ?? [];

    return Promise.all(cleaners.map(clean => clean()));
  }

  cleanupAll() {
    return Promise.all(Array.from(this.cleaners.values()).flat());
  }
}

