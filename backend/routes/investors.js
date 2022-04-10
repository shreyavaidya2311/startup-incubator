const router = require("express").Router();
const User = require("../models/users.model");
const Investor = require("../models/investors.model");
const Startup = require("../models/startups.model");

// @route POST /investors/get-investor
// @desc Gets a investor by id
router.post("/get-investor", (req, res) => {
  const { investor_id } = req.body;
  try {
    Investor.findOne({ investor_id: investor_id }).then((investor) => {
      res.status(200).send({ investor: investor });
    });
  } catch (err) {
    res.status(400).send("Error:" + err);
  }
});

// @route POST /investors/edit-investor
// @desc Edits a investor
router.post("/edit-investor", (req, res) => {
  const { investor_id, image } = req.body;
  try {
    Investor.findOneAndUpdate(
      { investor_id: investor_id },
      {
        img: image,
      }
    ).then((investor) => {
      User.findOneAndUpdate(
        { investor_id: investor_id },
        {
          img: image,
        }
      ).then(() => res.status(200).send({ investor: investor }));
    });
  } catch (err) {
    res.status(400).send("Error:" + err);
  }
});

// @route POST /investors/change-mode
// @desc Changes mode of investor
router.post("/change-mode", (req, res) => {
  const { investor_id, mode } = req.body;
  try {
    Investor.findOneAndUpdate(
      { investor_id: investor_id },
      { mode: mode }
    ).then((investor) => {
      res.status(200).send({ investor: investor });
    });
  } catch (err) {
    res.status(400).send("Error:" + err);
  }
});

// @route POST /investors/make-offer
// @desc Make offer to startup
router.post("/make-offer", (req, res) => {
  const {
    investor_id,
    startup_id,
    investor_name,
    investor_image,
    investment,
    equity,
  } = req.body;
  try {
    Investor.findOneAndUpdate(
      { investor_id: investor_id },
      { $push: { offers: startup_id } }
    ).then((investor) => {
      Startup.findOneAndUpdate(
        { startup_id: startup_id },
        {
          $push: {
            offers: {
              investor_id: investor_id,
              investment: investment,
              equity: equity,
              investor_name: investor_name,
              investor_image: investor_image,
            },
          },
        }
      ).then(() => {
        res.status(200).send({ investor: investor });
      });
    });
  } catch (err) {
    res.status(400).send("Error:" + err);
  }
});
module.exports = router;
