const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true});
const auth = require("../middleware/auth.middleware");

router.get("/", auth, async (req, res) => {
  try {
    const list = await User.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "Server error. Try again later"
    })
  };
});

router.get("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.send(user);
  } catch (e) {
    res.status(500).json({
      message: "Server error. Try again later"
    })
  }
})

router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
      res.send(updatedUser);
    } else {
      return res.status(401).json({message: "Unathorized"});
    }
  } catch (e) {
    res.status(500).json({
      message: "Server error. Try again later"
    })
  }
})

module.exports = router;