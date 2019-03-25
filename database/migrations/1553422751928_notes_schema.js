'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotesSchema extends Schema {
  up () {
    this.create('notes', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.text('contents').notNullable()
      table.string('image_url')
      table.string('datetime').notNullable()
      table.string('location')
      table.string('cordinate')
      table.timestamps()
    })
  }

  down () {
    this.drop('notes')
  }
}

module.exports = NotesSchema
