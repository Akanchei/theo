const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const awt = require("jsonwebtoken");

//Register new user
router.post("/register", async (req, res) => {
  const newUser = User.create({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      JSON.stringify(req.body.password),
      process.env.pass_sec
    ).toString(),
    isAdmin: req.body.isAdmin
  });
  try {
    const saveUser = await newUser.save();
    res.json({ data: saveUser });
  } catch (error) {
    res.json({ message: error });
  }
});
//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    !user &&
      res.status(401).json({
        success: false,
        error: "wrong credidentials right",
      });

    const hashedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.pass_sec
    );
    const Originalpassword = hashedPass.toString(CryptoJS.enc.Utf8);
    Originalpassword === req.body.password &&
      res.status(401).json({
        success: false,
        error: "wrong credidentials",
      });

    const accessToken = awt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.pass_sec,
      { expiresIn: "2d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ success: true, ...others, accessToken });
  } catch (error) {
    // res.json(error)
  }
});
module.exports = router;
