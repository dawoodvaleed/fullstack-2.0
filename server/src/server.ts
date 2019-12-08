import { postgresDB } from "./databases/postgres-db";
var app = require("./app");

const bootstrap = async () => {
  await postgresDB();

  app.use(async ctx => {
    ctx.body = "Welcome to my Server!";
  });
  app.listen(8000);
};
bootstrap();
