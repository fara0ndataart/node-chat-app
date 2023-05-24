import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('messages', function(table) {
    table.increments('id').primary();
    table.integer('sender_id')
      .unsigned()
      .notNullable()
      .defaultTo(null)
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.integer('receiver_id')
      .unsigned()
      .notNullable()
      .defaultTo(null)
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.integer('room_id')
      .unsigned()
      .notNullable()
      .defaultTo(null)
      .references('id')
      .inTable('chat_rooms')
      .onDelete('CASCADE');
    table.string('text').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('messages');
}

