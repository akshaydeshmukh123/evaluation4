const express = require("express");
const { connnection } = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./routes/user.Route");
const { postRouter } = require("./routes/post.Route");
const { auth } = require("./middlewares/auth");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Welcome Home");
});

app.use("/users", userRouter);

app.use(auth);
app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connnection;
    console.log("connected with db");
  } catch (error) {
    console.log({ msg: error.message });
  }
  console.log(`server is running at port ${process.env.port}`);
});

//ggvvvvvvvv