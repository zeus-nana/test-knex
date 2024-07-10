import { onDatabaseConnect } from "./config/knex";
import { createAuthorsWithbook, getLastAuthor } from "./examples/transaction";
import { getAuthorsPaginated } from "./examples/query_builder";

const main = async () => {
  await onDatabaseConnect();

  // const last_author = await getLastAuthor();
  // console.log(last_author);
  // await createAuthorsWithbook();
  // const new_last_author = await getLastAuthor();
  // console.log(new_last_author);

  const author = await getAuthorsPaginated(1, 0);
  console.log(author);
};

main();
