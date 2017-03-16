'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.increments('id');
      table.string('password').unique();
      table.string('username');

      table.timestamps();
    })
  }

  down () {
    this.drop('users');
  }

}

module.exports = UsersTableSchema
