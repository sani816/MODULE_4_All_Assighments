const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

const uniqueEmail = (req, res, next) => {
  const { email } = req.body;
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

  const emailExists = db.users.some((user) => user.email === email);

  if (emailExists) {
    return res.status(409).json({
      error: "Email already exists",
    });
  }

  next();
};

module.exports = uniqueEmail;
