const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashData = (data) => {
  return bcrypt.hashSync(data, saltRounds);
};

const compareData = (data, hashedData) => {
  return bcrypt.compareSync(data, hashedData);
};

module.exports = { hashData, compareData };
