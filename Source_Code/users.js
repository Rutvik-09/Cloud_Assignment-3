const express = require("express");
const NodeRSA = require("node-rsa");
const keys = require("./keys");

const router = express.Router();

let public_Key = new NodeRSA(keys.public_key);
let private_Key = new NodeRSA(keys.private_key);

router.post("/encrypt", (req, res) => {
  //use public key to encrypt the data
  var message = req.body.message;
  return res.status(200).json({
    response: public_Key.encrypt(message, "base64"),
  });
});

router.post("/decrypt", (req, res) => {
  //use private key to decrypt the data
  const message = req.body.message;
  return res.status(200).json({
    response: private_Key.decrypt(message, "utf8"),
  });
});

module.exports = router;
