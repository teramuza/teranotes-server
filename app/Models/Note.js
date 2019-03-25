'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Note extends Model {

	users(){
		return this.belongsTo('App/Models/Users')
	}
}

module.exports = Note
