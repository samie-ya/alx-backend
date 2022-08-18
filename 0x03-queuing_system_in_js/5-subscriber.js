// This script will create publisher and subscriber
import { createClient } from 'redis';
const client = createClient();

client.on('error', function (err) {
  console.log(`Redis client not connected to the server: ${err}`);
});

client.on('connect', function () {
  console.log('Redis client connected to the server');
});

const channel = 'holberton school channel';

client.subscribe(channel, (error, channel) => {
  if (error) {
    throw new Error(error);
  }
});

client.on('message', (channel, message) => {
  if (message === 'KILL_SERVER') {
    console.log(message);
    client.unsubscribe();
    client.quit();
  } else {
    console.log(message);
  }
});
