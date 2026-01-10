const fs = require("fs");
const path = require("path");

function readDataFile() {
  const filePath = path.join(__dirname, "Data.txt");
  const data = fs.readFileSync(filePath, "utf-8");
  return data;
}

module.exports = readDataFile;
