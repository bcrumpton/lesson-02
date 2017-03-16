'use strict'

const Restaurant = use('App/Model/Restaurant');
const attributes = [
  'name', 'category', 'wait_time', 'take_out', 'formal',
  'address', 'flair', 'price_level',
];

class RestaurantController {

  // Show all restaurants
  * index(request, response) {
    const restaurants = yield Restaurant.with('reviews').fetch();

    response.json(restaurants);
  }


  // This would only be used if we rendered HTML
  * create(request, response) {

  }

  // This is where we save/store restaurants
  * store(request, response) {
    // Get JSON data from the incoming request
    const input = request.only(attributes);

    // Create and save a new restaurant to the DB
    const restaurant = yield Restaurant.create(input);
    // Load all reviews for the new restaurant
    yield restaurant.related('reviews').load();

    response.status(201).json(restaurant);
  }

  // Show a single restaurant based on an id param
  * show(request, response) {
    // Get the id from the url
    const id = request.param('id');

    // Get restaurant from DB based on id
    const restaurant = yield Restaurant.findOrFail('id');

    // Load reviews for this restaurant
    yield restaurant.related('reviews').load();

    response.json();
  }

  // Not used in APIs this is for showing an edit form
  * edit(request, response) {}

  * update(request, response) {
    // Get the id from the request
    const id = request.param('id');

    // Find the restaurant by its id
    const restaurant = yield Restaurant.findOrFail(id);

    // Get the JSON input from the request
    const input = request.only(attributes);

    // Fill in our restaurant with updated input
    restaurant.fill(input);

    // Save our changes to the database
    yield restaurant.save();
    yield restaurant.related('reviews').load();

    response.send(restaurant);
  }

  * destroy(request, response) {
    response.notImplemented();restaurant
  }

}

module.exports = RestaurantController
