'use strict'

const Note = use('App/Models/Note')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with notes
 */
class NoteController {
  /**
   * Show a list of all notes.
   * GET notes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params, response }) {

    const { user } = params

    let notes = await Note
    .query()
    .where('user_id', user)
    .groupBy('datetime')
    .fetch()
    
    return notes
  }

  /**
   * Create/save a new note.
   * POST notes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response }) {
    const { user } = params
    const { contents, image_url, datetime, location } = request.all()
    const insertNote = {user_id : user, contents, image_url, datetime, location}

    await Note.create(insertNote)
    const output = {message: "Diary successfully saved", status : "success"}
    return output
  }

  /**
   * Display a single note.
   * GET notes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  // async show ({ params, request, response }) {
  // }

  /**
   * Render a form to update an existing note.
   * GET notes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  // async edit ({ params, request, response }) {
  // }

  /**
   * Update note details.
   * PUT or PATCH notes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { id, user } = params
    const { contents, image_url, datetime, location } = request.all()
    const upNote = {contents, image_url, datetime, location}

    await Note
    .query()
    .where('id', id)
    .update(upNote)

    const output = {message: 'Changes saved successfully', status: 'success'}
    return output
  }

  /**
   * Delete a note with id.
   * DELETE notes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const { id, user } = params

    const note = await Note.find(id)
    await note.delete()

    const output = {message : 'Diary successfully deleted', status : 'success'}
    return output
  }
}

module.exports = NoteController

//status : checking endpoint