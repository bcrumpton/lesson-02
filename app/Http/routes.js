'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');
const fetch = require('node-fetch');

// Route.on('/').render('welcome');

// async function() {
//   const res = await fetch('http://swapi.co/people/1');
//   const luke = await res.json();
//
//   response.json(luke);
// }

// Route.get('/', function * (request, response) {
//   const res = yield fetch('http://swapi.co/api/people/1');
//   const luke = yield res.json();
//
//   response.json(luke);
// });

// const Database = require('knex')(config.development);
const Database = use('Database');

Route.get('/restaurants', function * (request, response) {
  const restaurants = yield Database.select().from('restaurants');

  response.send(items);
});

Route.get('/restaurants/:id', function * (request, response) {
  const id = request.param('id');

  const r = yield Database.select().from('restaurants')
    .where({ id: id })
    .limit(1)
    // This is getting the first item from the result
    .first();

  // Check if the restaurant exists
  if (r === undefined) {
    // Send the status code 404 (not found) witha a JSON error object
    return response.status(404).json({
      err: 'Not found'
    });
  }

  response.send(r);
});

Route.post('/restaurants', function * (request, response) {
  const restaurant = {
    name: request.input('name'),
    category: request.input('category'),
    wait_time: request.input('wait_time'),
    take_out: request.input('take_out'),
    formal: request.input('formal'),
    address: request.input('address'),
    flair: request.input('flair'),
    price_level: request.input('price_level'),
  }

  yield Database.insert(restaurant).into('restaurants');

  response.send(restaurant);
});

Route.put('/restaurants/:id', function * (request, response) {
  const id = request.param('id');

  const r = yield Database.select().from('restaurants')
    .where({ id: id })
    .limit(1)
    // This is getting the first item from the result
    .first();

  // Check if the restaurant exists
  if (r === undefined) {
    // Send the status code 404 (not found) witha a JSON error object
    return response.status(404).json({
      err: 'Not found'
    });
  }

  const input = request.only('name', 'category', 'wait_time', 'take_out', 'formal', 'address', 'flair', 'price_level');

  yield Database.table('restaurants').update(input);

  response.send(input);
});
