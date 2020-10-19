import Knex from 'knex'

export async function up (knex: Knex): Promise<unknown> {
  // criar tabela
  return knex.schema.createTable('authors', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('avatar').notNullable()
  })
}

export async function down (knex: Knex): Promise<unknown> {
  // voltar atrás (deletar tabela)
  return knex.schema.dropTable('authors')
}
