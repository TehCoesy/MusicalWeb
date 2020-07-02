'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlaylistSchema extends Schema {
  up () {
    this.create('playlists', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('playlist_id').notNullable()
      table.integer('track_id').notNullable()
      table.string('title').notNullable().unique()
      table.integer('year').nullable()
      table.string('label').nullable()
      table.string('genre').notNullable()
      table.string('master_url').nullable()
      table.string('thumb_img').nullable()
      // table.timestamps()
    })
  }

  down () {
    this.drop('playlists')
  }
}

module.exports = PlaylistSchema
