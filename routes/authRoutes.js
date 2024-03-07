import express from "express";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailVerif = await User.findOne({ email });
    if (emailVerif) res.json("Cette adresse existe déjà");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await User.create({ name, email, password: hash });
    res.json(`Welcome ${user.name}`);
  } catch (error) {
    throw error.message;
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.json("Bad credentials");

    if (!bcrypt.compareSync(password, user.password))
      res.json("Bad credentials");

    const token = jwt.sign({ user }, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });

    res.header("auth-token", token);
    res.json(user);
  } catch (error) {
    throw error.message;
  }
});

export default router;
