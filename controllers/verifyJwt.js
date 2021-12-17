const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token) {
    console.log(token);
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, "token-secreto", function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyJWT;