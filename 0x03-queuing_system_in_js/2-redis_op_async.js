// This script will connect to a redis server and execute functions
import { createClient } from 'redis';
const util = require('util');

const client = createClient();

client.on('error', function (err) {
  console.log(`Redis client not connected to the server: ${err}`);
});

client.on('connect', function () {
  console.log('Redis client connected to the server');
});

async function setNewSchool (schoolName, value) {
  const setGet = util.promisify(client.set).bind(client);
  try {
    console.log('Reply:', await setGet(schoolName, value));
  } catch (err) {
    console.log(err);
  }
}

async function displaySchoolValue (schoolName) {
  const getSet = util.promisify(client.get).bind(client);
  try {
    const reply = await getSet(schoolName);
    console.log(reply);
  } catch (err) {
    console.log(err);
  }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
