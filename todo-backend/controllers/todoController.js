const Todo = require('../models/todo');

// Create Todo
exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = new Todo({ title });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all Todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
