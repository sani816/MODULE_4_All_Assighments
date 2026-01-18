const express = require("express");
const usersRouter = require("./routes/users.routes");

const app = express();
const PORT = 3000;

// for non-multipart routes (good practice)
app.use(express.json());

// routes
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
