import Knex from 'knex'

export async function up (knex: Knex): Promise<unknown> {
  // criar tabela
  return knex.schema.createTable('ebooks', table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('thumbnail').notNullable()
    table.integer('edition').notNullable()

    table.integer('albums_id')
      .notNullable()
      .references('id')
      .inTable('albums')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

export async function down (knex: Knex): Promise<unknown> {
  // voltar atrás (deletar tabela)
  return knex.schema.dropTable('ebooks')
}
