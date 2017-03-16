'use strict'

const Schema = use('Schema')

class ReviewsTableSchema extends Schema {

  up () {
    this.create('reviews', (table) => {
      table.increments();

      table.integer('rating');
      table.text('review');
      table.integer('restaurant_id')
        .references('id')
        .inTable('restaurants')
        .onDelete('CASCADE');

      table.integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');

      table.timestamps();
    });
  }

  down () {
    this.drop('reviews')
  }

}

module.exports = ReviewsTableSchema
