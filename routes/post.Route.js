const express = require("express");
const { PostModel } = require("../models/post.Model");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const { userID } = req.body;
  try {
    const posts = await PostModel.find({ userID });
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

postRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const post = new PostModel(payload);
    await post.save();
    res.status(200).send({ msg: "A new post has been posted" });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

postRouter.patch("/update/:userID", async (req, res) => {
  let { userID } = req.params;
  try {
    await UserModel.findByIdAndUpdate({ _id: userID });
    res.status(200).send({ msg: `user ${userID} has been updated` });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});
postRouter.delete("/update/:userID", async (req, res) => {
  let { userID } = req.params;
  try {
    await UserModel.findByIdAndDelete({ _id: userID });
    res.status(200).send({ msg: `user ${userID} has been delete` });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

module.exports = { postRouter };

//aakk