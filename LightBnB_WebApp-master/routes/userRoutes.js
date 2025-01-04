const express = require("express");
const bcrypt = require("bcrypt");
const database = require("../db/database");

const router = express.Router();

// Create a new user
router.post("/", (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  
  database
    .addUser(user)
    .then((newUser) => {
      if (!newUser) {
        return res.send({ error: "Failed to create user" });
      }

      req.session.userId = newUser.id;
      res.send("🤗");
    })
    .catch((e) => res.status(500).send(e));
});

// Log a user in
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  database
    .getUserWithEmail(email)
    .then((user) => {
      if (!user) {
        return res.send({ error: "No user with that email" });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.send({ error: "Incorrect password" });
      }

      req.session.userId = user.id;
      res.send({
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      });
    })
    .catch((e) => res.status(500).send(e));
});

// Log a user out
router.post("/logout", (req, res) => {
  req.session.userId = null;
  res.send({});
});

// Return information about the current user (based on cookie value)
router.get("/me", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ message: "Not logged in" });
  }

  database
    .getUserWithId(userId)
    .then((user) => {
      if (!user) {
        return res.send({ error: "No user with that id" });
      }

      res.send({
        user: {
          name: user.name,
          email: user.email,
          id: userId,
        },
      });
    })
    .catch((e) => res.status(500).send(e));
});

module.exports = router;

