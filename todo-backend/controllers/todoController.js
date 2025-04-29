const prisma = require('../prisma/client');

exports.getTodos = async (req, res) => {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const todo = await prisma.todo.create({ data: { title } });
  res.status(201).json(todo);
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { title, completed },
    });
    res.json(todo);
  } catch {
    res.status(404).json({ error: 'Todo not found' });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.todo.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: 'Todo not found' });
  }
};
