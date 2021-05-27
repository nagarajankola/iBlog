const { compare } = require("bcryptjs");
const express = require("express");
const router = express.Router();

// get the connection file
require("../db/conn");

const User = require("../models/userSchema");
const Article = require("../models/articleSchema");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Fill all the details!" });
      // console.log("this ran");
    }

    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = password === userLogin.password;

      if (!isMatch) {
        res.status(400).json({ error: "Password dosen't match" });
      } else {
        // console.log(userLogin);
        res.json({ error: "user signed successfully!", userLogin: userLogin });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  const { userName, email, password, confirmPassword, profilePicture } =
    req.body;
  // console.log(req.body);
  if (!userName || !email || !password || !confirmPassword) {
    return res.status(422).json({ error: "Fields can't be empty" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "useralready exists" });
    } else if (password != confirmPassword) {
      return res.status(422).json({ error: "password dosent match" });
    } else {
      const user = new User({ userName, email, password, profilePicture });

      // hashing occurs here

      const userRegister = await user.save();
      // console.log(userRegister);
      res.status(201).json({
        messsage: `user registered successfully!! \n Please login`,
        userRegister: userRegister,
      });
    }
  } catch (err) {
    console.log("errorrrrrr");
  }
});

router.post("/postArticle", async (req, res) => {
  const { articleTitle, articleBody, articleImage, uploadedBy, readTime } =
    req.body;
  // console.log(req.body);
  if (
    !articleTitle ||
    !articleBody ||
    !articleImage ||
    !uploadedBy ||
    !readTime
  ) {
    return res.status(422).json({ error: "Fields can't be empty" });
  }

  try {
    const article = new Article({
      articleTitle,
      articleBody,
      articleImage,
      uploadedBy,
      readTime,
    });

    const postedArticle = await article.save();

    res.status(201).json({ messsage: "Post done", postedArticle: postedArticle });
  } catch (error) {
    console.log(error);
  }
});

router.get("/allarticles", async (req, res) => {
  try {
    const allArticles = await Article.find({}).populate('uploadedBy').sort({'uploadedTime':'desc'});

    res.status(201).json({allArticles});
  } catch (err) {
    res.status(400).json({err});
    console.log(err);
  }
});

router.delete("/deleteArticle", async (req, res) => {
  
  try {
    // console.log(req.body);
    const id = req.body;
    // console.log(id);
    const deleteArticle = await Article.deleteOne({_id: id})
    res.status(204).json({message:"Article Deleted"});
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
