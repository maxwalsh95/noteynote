const subscribers = {};

export function publish(eventName, data) {
  if (!Array.isArray(subscribers[eventName])) {
    return;
  }

  subscribers[eventName].forEach((callback) => callback(data));
}

export function subscribe(eventName, callback) {
  if (!Array.isArray(subscribers[eventName])) {
    subscribers[eventName] = [];
  }
  subscribers[eventName].push(callback);
}
