'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'welcome to tera api' }
})

Route.group(() => {

	//auth
	Route.post('auth/register', 'AuthController.register').middleware(['guest'])
	Route.post('auth/login', 'AuthController.login').middleware(['guest'])
	Route.post('auth/logout', 'AuthController.revokeUserToken').middleware(['auth'])

	//diary
	Route.get('notes/:user', 'NoteController.index').middleware(['auth'])
	Route.post('notes/:user', 'NoteController.store').middleware(['auth'])
	Route.patch('notes/:user/:id', 'NoteController.update').middleware(['auth'])
	Route.delete('notes/:user/:id', 'NoteController.destroy').middleware(['auth'])

}).prefix('trnote/v1')

