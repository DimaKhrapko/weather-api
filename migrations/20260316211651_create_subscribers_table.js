/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('subscribers', (table) => {
    table.increments();
    table.string('email').notNullable().unique();
    table.string('city').notNullable();
    table.string('token').notNullable().unique();
    table.boolean('is_active').defaultTo(false);
    table.enum('frequency', ['hourly', 'daily']).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('subscribers');
};
