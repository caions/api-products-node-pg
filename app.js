require("express-async-errors");
const express = require("express");
const app = express();
const routes = require("./routes/index");
const handlerError = require("./utils/handleError");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

// handler errors of aplication
app.use(handlerError);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
