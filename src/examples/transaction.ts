import knex from "../config/knex";

export const getLastAuthor = async () => {
  const author = await knex("authors").orderBy("created_at", "desc").first();
  return author;
};

export const createAuthorsWithbook = async () => {
  try {
    await knex.transaction(async (trx) => {
      const author = (
        await trx("authors").insert(
          {
            name: "Transaction Author",
            bio: "transaction author bio",
          },
          "*",
        )
      )[0];
      await trx("books").insert(
        {
          title: "transaction book",
          author_id: author.id,
          price: 100,
          genre_id: 1,
        },
        "*",
      );
    });
    console.log("Author created");
  } catch (error) {
    console.log("Error during transaction", error);
  }
};
