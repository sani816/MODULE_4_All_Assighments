import { readDB, writeDB } from "../models/todo.model.js";

export const createTodo = (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const db = readDB();

    const newTodo = {
      id: Date.now(),
      title,
      completed: false
    };

    db.todos.push(newTodo);
    writeDB(db);

    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

export const getAllTodos = (req, res, next) => {
  try {
    const db = readDB();
    res.status(200).json(db.todos);
  } catch (error) {
    next(error);
  }
};

export const getTodoById = (req, res, next) => {
  try {
    const db = readDB();
    const todo = db.todos.find(
      (t) => t.id === Number(req.params.todoId)
    );

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = (req, res, next) => {
  try {
    const db = readDB();
    const index = db.todos.findIndex(
      (t) => t.id === Number(req.params.todoId)
    );

    if (index === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }

    db.todos[index] = {
      ...db.todos[index],
      ...req.body
    };

    writeDB(db);
    res.status(200).json(db.todos[index]);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = (req, res, next) => {
  try {
    const db = readDB();
    const filteredTodos = db.todos.filter(
      (t) => t.id !== Number(req.params.todoId)
    );

    if (filteredTodos.length === db.todos.length) {
      return res.status(404).json({ error: "Todo not found" });
    }

    db.todos = filteredTodos;
    writeDB(db);

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    next(error);
  }
};
