import knex from "../config/knex";

export const getBooksWithAuthorsAndGenres = async () => {
  const books = await knex("books")
    .join("authors", "books.author_id", "authors.id")
    .join("genres", "books.genre_id", "genres.id")
    .select(
      "books.id",
      "books.title",
      "authors.name as author",
      "genres.name as genre",
    )
    .orderBy("books.created_at", "asc");
  return books;
};

export const getAuthorsWithBookCount = async () => {
  const authors = await knex("authors")
    .join("books", "authors.id", "books.author_id")
    .select("authors.name", knex.raw("count(books.id) as book_count"))
    .groupBy("authors.id", "authors.name")
    .havingRaw("count(books.id) > 1")
    .orderBy("book_count", "desc");
  return authors;
};

export const getGenresWithBookCount = async () => {
  const genres = await knex("genres")
    .join("books", "genres.id", "books.genre_id")
    .count("books.id as book_count")
    .groupBy("genres.id", "genres.name")
    .orderBy("genres.name", "asc");
  return genres;
};
