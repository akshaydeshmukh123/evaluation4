const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.Model");

const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});
userRouter.post("/register", (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      let user = new UserModel({
        name,
        email,
        gender,
        password: hash,
        age,
        city,
        is_married,
      });
      await user.save();
      res.status(200).send({ msg: "a new user has been added" });
    });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.find({ email });
    if (user.length > 0) {
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (passwordMatch) {
        const token = jwt.sign(
          {
            userID: user[0]._id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          },
          "masai"
        );
        res.status(200).send({
          msg: "Login Successfull",
          token: token,
        });
      } else {
        res.status(404).send({ msg: "Wrong Credential" });
      }
    } else {
      res.status(404).send({ msg: "Wrong Credential" });
    }
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

userRouter.patch("/update/:userID", async (req, res) => {
  let { userID } = req.params;
  try {
    await UserModel.findByIdAndUpdate({ _id: userID });
    res.status(200).send({ msg: `user ${userID} has been updated` });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});
userRouter.delete("/update/:userID", async (req, res) => {
  let { userID } = req.params;
  try {
    await UserModel.findByIdAndDelete({ _id: userID });
    res.status(200).send({ msg: `user ${userID} has been delete` });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

userRouter.get("/update/:userID", async (req, res) => {
  let { userID } = req.params;
  try {
    let user = await UserModel.findById({ _id: userID });
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

module.exports = { userRouter };
