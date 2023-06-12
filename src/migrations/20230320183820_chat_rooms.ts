import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('chat_rooms', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('creator_id')
      .unsigned()
      .notNullable()
      .defaultTo(null)
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.index('creator_id');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('chat_rooms');
}

