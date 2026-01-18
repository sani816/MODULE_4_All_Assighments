const express = require("express");
const todosRouter = require("./routes/todos.routes");
const loggerMiddleware = require("./middleware/logger.middleware");

const app = express();
const PORT = 3000;

app.use(express.json());


app.use(loggerMiddleware);


app.use("/todos", todosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
