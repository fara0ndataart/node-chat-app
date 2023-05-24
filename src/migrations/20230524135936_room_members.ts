import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('room_members', function(table) {
    table.increments('id').primary();
    table.integer('room_id')
      .unsigned()
      .notNullable()
      .defaultTo(null)
      .references('id')
      .inTable('chat_rooms')
      .onDelete('CASCADE');
    table.integer('user_id')
      .unsigned()
      .notNullable()
      .defaultTo(null)
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('room_members');
}

