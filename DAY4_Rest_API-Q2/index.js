const express = require("express");
const os = require("os");
const dns = require("dns");
const readDataFile = require("./read");

const app = express();
const PORT = 5000;


app.get("/test", (req, res) => {
  res.send("Test route is working!");
});


app.get("/readfile", (req, res) => {
  const data = readDataFile();
  res.send(data);
});


app.get("/systemdetails", (req, res) => {
  const systemDetails = {
    platform: os.platform(),
    totalMemory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(0)} GB`,
    freeMemory: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(0)} GB`,
    cpuModel: os.cpus()[0].model
  };

  res.json(systemDetails);
});


app.get("/getip", (req, res) => {
  dns.lookup("masaischool.com", (err, address) => {
    if (err) {
      res.status(500).send("DNS lookup failed");
    } else {
      res.json({
        hostname: "masaischool.com",
        ipAddress: address
      });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
