require("express-async-errors");
const { PORT, NODE_ENV } = require("./config/environment");

console.log(`NODE_ENV=${NODE_ENV}`);
const express = require("express");

const app = express();
const routes = require("./routes/index");
const handlerError = require("./utils/handleError");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

// handler errors of aplication
app.use(handlerError);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
