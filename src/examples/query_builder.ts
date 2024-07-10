import knex from "../config/knex";
import { Author } from "../types";

export const getAuthorsPaginated = async (
  limit: number,
  offset: number,
): Promise<{}> => {
  const query_builder = knex("authors").where("name", "like", "%a%");

  const authors = await query_builder.limit(limit).offset(offset).select();

  const count = await query_builder.clone().count().first();

  return { authors, count };
};
