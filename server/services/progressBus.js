import EventEmitter from 'events';

const buses = new Map();

let redisAvailable = false;
let RedisPub = null;
let RedisSub = null;

async function initRedis() {
  if (redisAvailable || !process.env.REDIS_URL) return;
  try {
    const IORedis = await import('ioredis');
    RedisPub = new IORedis.default(process.env.REDIS_URL);
    RedisSub = new IORedis.default(process.env.REDIS_URL);
    redisAvailable = true;
  } catch (e) {
    // ioredis not installed or failed — fall back to in-memory
    redisAvailable = false;
  }
}

export async function getBus(id) {
  if (!buses.has(id)) {
    const emitter = new EventEmitter();
    buses.set(id, emitter);
    // if Redis available, subscribe and forward messages to emitter
    await initRedis();
    if (redisAvailable && RedisSub) {
      const channel = `glyphra:progress:${id}`;
      await RedisSub.subscribe(channel);
      const handler = (chan, message) => {
        if (chan !== channel) return;
        try {
          const payload = JSON.parse(message);
          emitter.emit(payload.type || 'progress', payload);
        } catch (e) {}
      };
      RedisSub.on('message', handler);
      // store handler so it can be removed later
      emitter._redisHandler = { channel, handler };
    }
  }
  return buses.get(id);
}

export async function emitTo(id, event, payload) {
  // ensure bus exists
  if (!buses.has(id)) buses.set(id, new EventEmitter());
  const bus = buses.get(id);
  // emit locally
  // debug
  try { console.log('[BUS] emitTo', id, event, 'listeners=', bus.listenerCount(event)); } catch (e) {}
  bus.emit(event, payload);
  // publish to Redis channel if available
  await initRedis();
  if (redisAvailable && RedisPub) {
    const channel = `glyphra:progress:${id}`;
    try {
      await RedisPub.publish(channel, JSON.stringify({ type: event, ...payload }));
    } catch (e) {
      // ignore publish errors
    }
  }
}

export async function removeBus(id) {
  const bus = buses.get(id);
  if (bus) {
    if (bus._redisHandler && RedisSub) {
      try {
        await RedisSub.unsubscribe(bus._redisHandler.channel);
        RedisSub.off('message', bus._redisHandler.handler);
      } catch (e) {}
    }
    bus.removeAllListeners();
    buses.delete(id);
  }
}
