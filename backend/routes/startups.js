const router = require("express").Router();
const User = require("../models/users.model");
const Startup = require("../models/startups.model");

// @route POST /startups/get-startup
// @desc Gets a startup by id
router.post("/get-startup", (req, res) => {
  const { startup_id } = req.body;
  try {
    Startup.findOne({ startup_id: startup_id }).then((startup) => {
      res.status(200).send({ startup: startup });
    });
  } catch (err) {
    res.status(400).send("Error:" + err);
  }
});

// @route POST /startups/edit-startup
// @desc Edits a startup
router.post("/edit-startup", (req, res) => {
  const { startup_id, pitch, investment, equity, clogo, tagline } = req.body;
  try {
    Startup.findOneAndUpdate(
      { startup_id: startup_id },
      {
        pitch: pitch,
        investment: investment,
        equity: equity,
        clogo: clogo,
        tagline: tagline,
      }
    ).then((startup) => {
      res.status(200).send({ startup: startup });
    });
  } catch (err) {
    res.status(400).send("Error:" + err);
  }
});

// @route POST /startups/change-mode
// @desc Changes mode of startup
router.post("/change-mode", (req, res) => {
  const { startup_id, mode } = req.body;
  try {
    Startup.findOneAndUpdate({ startup_id: startup_id }, { mode: mode }).then(
      (startup) => {
        res.status(200).send({ startup: startup });
      }
    );
  } catch (err) {
    res.status(400).send("Error:" + err);
  }
});

// @route POST /startups/get-preferred-startups
// @desc Returns preferred startups
router.post("/get-preferred-startups", (req, res) => {
  const { domains } = req.body;
  try {
    Startup.find({ domain: { $in: domains } }).then((startup) => {
      res.status(200).send({ startup: startup });
    });
  } catch (err) {
    res.status(400).send("Error:" + err);
  }
});

module.exports = router;
