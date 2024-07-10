import { onDatabaseConnect } from "./config/knex";

onDatabaseConnect()
  .then(() => console.log("Database connected successfully"))
  .catch((e) => console.error(e));
