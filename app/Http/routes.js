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



Route.resource('/restaurants', 'RestaurantController');
Route.post('/users', 'UserController.store');
Route.post('/login', 'UserController.login')
const Review = use('App/Model/Review');

Route.post('/restaurants/:restaurant_id/reviews', function * (request, response) {
  const restaurant_id = request.param('restaurant_id');
  const input = request.only('rating', 'review');
  input.restaurant_id = restaurant_id;

  // const review = new Review(input);
  // yield review.save();
  const review = yield Review.create(input);

  response.send(review);
});
