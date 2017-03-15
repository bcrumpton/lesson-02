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

Route.get('/', function * (request, response) {
  const res = yield fetch('http://swapi.co/api/people/1');
  const luke = yield res.json();

  response.json(luke);
});

// const Database = require('knex')(config.development);
const Database = use('Database');
const Restaurant = use('App/Model/Restaurant');
const Review = use('App/Model/Review');

Route.get('/restaurants', function * (request, response) {
  // Get all rows from the "restaurants" table
  // const items = yield Database.select().from('restaurants');
  const items = yield Restaurant.with('reviews').fetch();
  response.send(items);
});

Route.get('/restaurants/:id', function * (request, response) {
  const id = request.param('id');
  // SELECT * FROM restaurants WHERE id = ? LIMIT 1
  const r = yield Restaurant.findOrFail(id);
  // Load all related "reviews"
  yield r.related('reviews').load();

  response.send(r);
});

Route.post('/restaurants', function * (request, response) {
  const input = request
    .only('name', 'category', 'wait_time', 'take_out', 'formal', 'address', 'flair', 'price_level');

  const restaurant = yield Restaurant.create(input);

  response.send(restaurant);
});

Route.put('/restaurants/:id', function * (request, response) {
  // Get the id from the request
  const id = request.param('id');

  // Find the restaurant by its id
  const r = yield Restaurant.findOrFail(id);

  // Get the JSON input from the request
  const input = request.only('name', 'category', 'wait_time', 'take_out', 'formal', 'address', 'flair', 'price_level');

  // Fill in our restaurant with updated input
  r.fill(input);

  // Save our changes to the database
  yield r.save();

  response.send(r);
});

Route.post('/restaurants/:restaurant_id/reviews', function * (request, response) {
  const restaurant_id = request.param('restaurant_id');
  const input = request.only('rating', 'review');
  input.restaurant_id = restaurant_id;

  // const review = new Review(input);
  // yield review.save();
  const review = yield Review.create(input);

  response.send(review);
});
