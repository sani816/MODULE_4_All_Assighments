import express from "express";
import todoRoutes from "./routes/todo.routes.js";
import errorHandler from "./middleware/errorHandler.middleware.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// routes
app.use("/todos", todoRoutes);

// global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
