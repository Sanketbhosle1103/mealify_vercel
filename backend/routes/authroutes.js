const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = "gauravrjfefjewiojoiewj";

const PORT = process.env.PORT;

router.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const existingPhone = await User.findOne({ phone: phone });
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "User with this phone number already exists" });
    }

    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
    });

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  console.log("login of "+PORT);
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (!passOk) {
      return res.status(422).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: userDoc._id,
      },
      jwtSecret
    );
    
    const { password: pass, ...rest } = userDoc._doc;
    res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    console.log(error);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
});

router.post("/google", async (req, res) => {
  try {
    // console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, jwtSecret);
      const { password: pass, ...rest } = user._doc;
      res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
        phone: req.body.phone,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, jwtSecret);
      const { password: pass, ...rest } = newUser._doc;
      res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
