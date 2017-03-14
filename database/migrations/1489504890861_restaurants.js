'use strict'

const Schema = use('Schema')

class RestaurantsTableSchema extends Schema {
  // How we are changing the database when this migration is run
  up () {
    this.createTable('restaurants', (table) => {
      // alter restaurants table
      table.increments('id');

      table.string('name');
      table.string('category');
      table.string('address');

      table.integer('price_level');
      table.integer('wait_time');
      table.integer('flair');

      table.boolean('take_out');
      table.boolean('formal');

      table.timestamps();
    })
  }
  // How to undo the 'up' function
  down () {
    this.dropTable('restaurants');
  }

}

module.exports = RestaurantsTableSchema
