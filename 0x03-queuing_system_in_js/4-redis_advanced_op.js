// This script will store hash values
import { createClient } from 'redis';
const redis = require('redis');

const client = createClient();

client.on('connect', function () {
  console.log('Redis client connected to the server');
});

client.hset('HolbertonSchools', 'Portland', 50, redis.print);
client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
client.hset('HolbertonSchools', 'New York', 20, redis.print);
client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
client.hset('HolbertonSchools', 'Cali', 40, redis.print);
client.hset('HolbertonSchools', 'Paris', 2, redis.print);

client.hgetall('HolbertonSchools', function (err, object) {
  if (err) {
    console.log(err);
  } else {
    console.log(object);
  }
});
