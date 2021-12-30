require("express-async-errors");
const { PORT, NODE_ENV } = require("./config/environment");
const { sequelize } = require("./config/dbConnection");
const User = require("./model/entities/User");
const Product = require("./model/entities/Product");

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

(async () => {
  try {
    User.belongsToMany(Product, { through: "UserProducts" });
    Product.belongsToMany(User, { through: "UserProducts" });

    await sequelize.sync({ force: false });

    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
  } catch (error) {
    console.log(error);
  }
})();
