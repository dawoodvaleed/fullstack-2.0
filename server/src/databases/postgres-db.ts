import { createConnection } from "typeorm";
import { postgresTables } from "./postgres-tables";

export const postgresDB = async () => {
  let retries = 10;
  while (retries > 0) {
    try {
      return await createConnection({
        type: "postgres",
        host: "database",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "chairlift",
        ssl: false,
        entities: postgresTables,
        logging: ["query", "error"],
        synchronize: true
      }).then(connection => {
        console.log("Database connection established");
      });
    } catch (ex) {
      retries -= 1;

      console.log(`db connection failed: `, ex);
      console.log(`Retrying after 10 seconds`);
      console.log(`Retries left ${retries}`);

      await new Promise(resolve => setTimeout(resolve, 10 * 1000));
    }
  }
};
