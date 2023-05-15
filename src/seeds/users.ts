import { Knex } from "knex";
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    const password = await bcrypt.hash(faker.internet.password(), 10);

    await knex("users").del();

    for (let i = 0; i < 5; i++) {
        await knex("users").insert([{
            id: i,
            email: faker.internet.email(),
            password,
            role: 'guest'
        }]);
    }
}
