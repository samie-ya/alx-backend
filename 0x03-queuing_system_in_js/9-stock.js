// This script will integrate express and redis
import { createClient } from 'redis';
const express = require('express');
const util = require('util');

const app = express();
const client = createClient();

const listProducts = [
  { 'itemId': 1, 'itemName': 'Suitcase 250', 'price': 50, 'initialAvailableQuantity': 4 },
  { 'itemId': 2, 'itemName': 'Suitcase 450', 'price': 100, 'initialAvailableQuantity': 10 },
  { 'itemId': 3, 'itemName': 'Suitcase 650', 'price': 350, 'initialAvailableQuantity': 2 },
  { 'itemId': 4, 'itemName': 'Suitcase 1050', 'price': 550, 'initialAvailableQuantity': 5 }
];
const port = 1245;
const host = 'localhost';

function getItemById (id) {
  for (const i of listProducts) {
    if (i['itemId'] === id) {
      return i;
    }
  }
}

async function reserveStockById (itemId, stock) {
  const setGet = util.promisify(client.set).bind(client);
  try {
    const key = `item.${itemId}`;
    await setGet(key, stock);
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentReservedStockById (itemId) {
  const getSet = util.promisify(client.get).bind(client);
  try {
    const key = `item.${itemId}`;
    const reply = await getSet(key);
    return reply;
  } catch (error) {
    console.log(error);
  }
}

app.get('/list_products', (request, response) => {
  response.send(listProducts);
});

app.get('/list_products/:itemId', (request, response) => {
  const itemId = request.params.itemId;
  const id = parseInt(itemId);
  const product = getItemById(id);
  if (product) {
    reserveStockById (itemId, product['initialAvailableQuantity']);
    getCurrentReservedStockById(itemId)
      .then((current) => {
        product['currentQuantity'] = current;
        response.send(product);
      });
  } else {
    response.send({ status: 'Product not found' });
  }
});

app.get('/reserve_product/:itemId', (request, response) => {
  const itemId = request.params.itemId;
  const id = parseInt(itemId);
  const product = getItemById(id);
  if (product) {
    if (product['initialAvailableQuantity'] === 0) {
      response.send({ status: 'Not enough stock available', itemId: id });
    } else {
      reserveStockById(id, 1);
      product['initialAvailableQuantity'] -= 1;
      response.send({ status: 'Reservation confirmed', itemId: id });
    }
  } else {
    response.send({ status: 'Product not found' });
  }
});

app.listen(port, host, () => {
  process.stdout.write('...');
});
