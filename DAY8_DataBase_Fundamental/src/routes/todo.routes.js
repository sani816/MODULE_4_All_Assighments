import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/add", createTodo);
router.get("/", getAllTodos);
router.get("/:todoId", getTodoById);
router.put("/update/:todoId", updateTodo);
router.delete("/delete/:todoId", deleteTodo);

export default router;
