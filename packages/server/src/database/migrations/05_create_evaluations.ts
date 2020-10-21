import Knex from 'knex'

export async function up (knex: Knex): Promise<unknown> {
  // criar tabela
  return knex.schema.createTable('evaluations', table => {
    table.increments('id').primary()
    table.integer('note').notNullable()
    table.string('message')

    table.integer('ebook_id')
      .notNullable()
      .references('id')
      .inTable('ebooks')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

export async function down (knex: Knex): Promise<unknown> {
  // voltar atrás (deletar tabela)
  return knex.schema.dropTable('evaluations')
}
