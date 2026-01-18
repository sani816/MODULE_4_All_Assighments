const express = require("express");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../config/cloudinary.config");
const upload = require("../middleware/upload.middleware");
const uniqueEmail = require("../middleware/uniqueEmail.middleware");

const router = express.Router();
const dbPath = path.join(__dirname, "../db.json");

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeDB = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

router.post(
  "/signup",
  upload.single("profile"),
  uniqueEmail,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "Profile image is required",
        });
      }

      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          error: "All fields are required",
        });
      }

      // upload to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`
      );

      const db = readDB();

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        profilePic: result.secure_url,
      };

      db.users.push(newUser);
      writeDB(db);

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          profilePic: newUser.profilePic,
        },
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

module.exports = router;
