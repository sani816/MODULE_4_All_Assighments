const validateTodo = (req, res, next) => {
  const keys = Object.keys(req.body);

  if (keys.length !== 1 || !keys.includes("title")) {
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed",
    });
  }

  if (typeof req.body.title !== "string" || req.body.title.trim() === "") {
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed",
    });
  }

  next();
};

module.exports = validateTodo;
