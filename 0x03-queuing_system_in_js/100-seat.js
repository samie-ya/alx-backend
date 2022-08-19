// This script will reserve seats
import { createClient } from 'redis';
const util = require('util');

const client = createClient();

async function reserveSeat (number) {
  const setGet = util.promisify(client.set).bind(client);
  try {
    await setGet('available_seats', number);
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentAvailableSeats () {
  const getSet = util.promisify(client.get).bind(client);
  try {
    const reply = await getSet('available_seats');
    return reply;
  } catch (error) {
    console.log(error);
  }
}

const kue = require('kue');
const queue = kue.createQueue();

const express = require('express');
const app = express();
const port = 1245;
const host = 'localhost';

app.get('/available_seats', (request, response) => {
  getCurrentAvailableSeats()
    .then((reply) => {
      response.send({'numberOfAvailableSeats': reply});
    });
});

app.get('/reserve_seat', (request, response) => {
  client.get('reservationEnabled', function (err, reply) {
    if (reply === false) {
      response.send({ "status": "Reservation are blocked" });
    } else {
      const job = queue.create('reserve_seat')
        .save(function (err) {
          if (!err) {
            response.send({ "status": "Reservation in process" });
          } else {
            response.send({ "status": "Reservation failed" });
          }
        });
      job.on('complete', function (result) {
        console.log(`Seat reservation job ${job.id} completed`);
      }).on('failed', function (errorMessage) {
        console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
      });
    }
  });
});

app.get('/process', (request, response) => {
  response.send({ "status": "Queue processing" });
  queue.process('reserve_seat', async function (job, done) {
    getCurrentAvailableSeats()
      .then((reply) => {
        if (reply > 0) {
          reply -= 1;
          reserveSeat(reply);
          done();
        } else {
          client.set('reservationEnabled', false);
          return done(new Error('Not enough seats available'));
	}
      });
  });
});

app.listen(port, host, () => {
  reserveSeat(50);
  client.set('reservationEnabled', true);
  process.stdout.write('...');
});
