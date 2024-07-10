import knex from "../config/knex";
import { Author, Book } from "../types";

export const getAllAuthors = async (limit: number, offset: number) => {
  const authors = await knex("authors")
    .orderBy("created_at", "asc")
    .limit(limit)
    .offset(offset);
  return authors;
};

// return Promise < Array < Book > >
export const getBooks = async (
  limit: number,
  offset: number,
): Promise<Array<Book>> => {
  const books = await knex("books")
    .join("authors", "books.author_id", "authors.id")
    .orderBy("books.created_at", "asc")
    .limit(limit)
    .offset(offset);
  return books;
};

export const getAuthorById = async (id: number) => {
  const author = await knex("authors").where({ id }).first();
  return author;
};

export const getBookById = async (id: number) => {
  const book = await knex("books").where("id", "=", id).first();
  return book;
};

export const getGenreById = async (id: number) => {
  const genre = await knex("genres").where({ id }).first();
  return genre;
};

export const createAuthor = async (body: Partial<Author>) => {
  const author = await knex("authors").insert(body, "*");
  return author[0];
};

export const checkIfAuthorExists = async (id?: number) => {
  if (!id) throw new Error("Author id is required");
  const author = await getAuthorById(id);
  if (!author) throw new Error("Author not found");
  return author;
};

export const checkIfGenreExists = async (id?: number) => {
  if (!id) throw new Error("Genre id is required");
  const genre = await getGenreById(id);
  if (!genre) throw new Error("Genre not found");
  return genre;
};

export const checkIfBookExists = async (id?: number) => {
  if (!id) throw new Error("Book id is required");
  const book = await getBookById(id);
  if (!book) throw new Error("Book not found");
  return book;
};

export const createBook = async (body: Partial<Book>) => {
  const author = await checkIfAuthorExists(body.author_id);
  const genre = await checkIfGenreExists(body.genre_id);
  const newBook = await knex("books").insert(body, "*");
  return newBook[0];
};

export const updateAuthor = async (id: number, body: Partial<Author>) => {
  await checkIfAuthorExists(id);
  const author = await knex("authors").where({ id }).update(body, "*");
  return author[0];
};

export const updateBook = async (id: number, body: Partial<Book>) => {
  if (body.author_id) await checkIfAuthorExists(body.author_id);
  if (body.genre_id) await checkIfGenreExists(body.genre_id);
  const book = await knex("books").where({ id }).update(body, "*");
  return book[0];
};

export const removeBook = async (id: number) => {
  await checkIfBookExists(id);
  await knex("books").where({ id }).del();
  return true;
};

export const removeAuthor = async (id: number) => {
  await checkIfAuthorExists(id);
  const count_result = await knex("books")
    .where({ author_id: id })
    .count()
    .first();

  const book_result = Number(count_result?.count);
  if (book_result > 0) throw new Error("Author has books associated with it");

  await knex("authors").where({ id }).delete();
  return true;
};
