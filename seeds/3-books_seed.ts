import { Knex } from "knex";
import { faker } from "@faker-js/faker";
import { Book } from "../src/types";

const SEED_COUNT = 100;

const createBook = (
  authors_count: number,
  genres_count: number,
): Partial<Book> => ({
  title: faker.lorem.sentences(3),
  description: faker.lorem.paragraphs(5),
  price: faker.number.int({ min: 1, max: 1000 }),
  author_id: faker.number.int({ min: 1, max: authors_count }),
  genre_id: faker.number.int({ min: 1, max: genres_count }),
});

export async function seed(knex: Knex): Promise<void> {
  const authors_count = (await knex("authors").count().first())?.count || 0;
  const genres_count = (await knex("genres").count().first())?.count || 0;

  const books = Array(SEED_COUNT)
    .fill(null)
    .map(() => createBook(Number(authors_count), Number(genres_count)));
  await knex("books").insert(books);
}
