'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('image_url')
      table.string('first_name').notNullable()
      table.string('last_name')
      table.boolean('is_pro').defaultTo(false)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
