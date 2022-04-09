const router = require("express").Router();
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/default.json");

// @route POST /users/register-investor
// @desc Registers a new investor
router.post("/register-investor", (req, res) => {
  let {
    firstName,
    lastName,
    email,
    password,
    username,
    phoneno,
    istartups,
    experience,
    domains,
  } = req.body;
  try {
    User.findOne({ username }).then((user) => {
      if (user) {
        return res.status(400).json("Username already exists");
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
          username,
          phoneno,
          istartups,
          experience,
          domains,
          role: "investor",
        });
        bcrypt.hash(newUser.password, 10, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(() =>
              res
                .status(200)
                .send({ msg: "New user created successfully", user: newUser })
            )
            .catch((err) => res.status(400).send("Error:" + err));
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// @route POST /users/register-startup
// @desc Registers a new startup
router.post("/register-startup", (req, res) => {
  let {
    username,
    password,
    email,
    firstName,
    lastName,
    phoneno,
    istartups,
    domain,
    nstartup,
    valuation,
  } = req.body;
  try {
    User.findOne({ username }).then((user) => {
      if (user) {
        return res.status(400).json("Username already exists");
      } else {
        const newUser = new User({
          username,
          password,
          email,
          firstName,
          lastName,
          phoneno,
          istartups,
          domain,
          nstartup,
          valuation,
          role: "startup",
        });
        bcrypt.hash(newUser.password, 10, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(() =>
              res
                .status(200)
                .send({ msg: "New user created successfully", user: newUser })
            )
            .catch((err) => res.status(400).send("Error:" + err));
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// @route POST /users/login
// @desc Login in for existing user
router.post("/login", (req, res) => {
  let { username, password } = req.body;
  try {
    User.findOne({ username }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .send("User with email: " + req.body.username + " not found");
      }
      bcrypt.compare(password, user._doc.password).then((matched) => {
        if (matched) {
          const payload = {
            id: user.id,
            name: user.name,
          };
          jwt.sign(
            payload,
            keys.jwtSecretKey,
            {
              expiresIn: "365d",
            },
            (err, token) => {
              if (token) {
                res.status(200).json({
                  ...user._doc,
                  msg: "User successfully logged in",
                  token,
                });
              } else {
                res.status(400).json(err);
              }
            }
          );
        } else {
          return res.status(400).send("Incorrect password");
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
});

// @route POST /users/verify
// @desc Verifies whether the user is logged in
router.post("/verify", async (req, res) => {
  const token = req.body.headers["smartup-auth-token"];
  if (!token) {
    return res.status(400).json({ res: false, msg: "Invalid token" });
  }
  try {
    jwt.verify(token, keys.jwtSecretKey);
    return res.status(200).json({ res: true, msg: "Valid token" });
  } catch (e) {
    return res.status(400).json({ res: false, msg: e });
  }
});

module.exports = router;
