const router = require("express").Router();
const User = require("../dbSchema/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");
const tokenList = {};
const ErrorResponse = require("../middleware/error");

const validateLoginInput = require("../client/validation/login");

//REGISTER
router.post("/register", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      birthday: req.body.birthday,
      question: req.body.question,
    });

    const user = await newUser.save();
    return res.status(200).json(user);
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) throw Error("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: config.tokenLife,
    });
    if (!token) throw Error("Couldnt sign the token");

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,

        auth: true,
        msg: "Login Successful",
        httpOnly: true,
        secure: true,
        success: true,
        token: "Bearer " + token,

        sameSite: true,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get("/secure", (req, res) => {
  // all secured routes goes here
  res.send("I am secured...");
});

module.exports = router;
