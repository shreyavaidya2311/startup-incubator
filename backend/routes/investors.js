const router = require("express").Router();
const User = require("../models/users.model");
const Investor = require("../models/investors.model");

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

module.exports = router;
