'use strict'

const Lucid = use('Lucid')

class Restaurant extends Lucid {

  reviews() {
    return this.hasMany('App/Model/Review');
  }

}

module.exports = Restaurant
