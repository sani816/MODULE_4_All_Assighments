const supabase = require('../config/supabase')

exports.createTodo = async (req, res) => {
  const { title } = req.body
  const userId = req.user.userId

  const { data, error } = await supabase
    .from('todos')
    .insert([{ title, completed: false, userId }])
    .select()

  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json(data)
}

exports.getTodos = async (req, res) => {
  const userId = req.user.userId

  const { data } = await supabase
    .from('todos')
    .select('*')
    .eq('userId', userId)

  res.json(data)
}

exports.updateTodo = async (req, res) => {
  const { id } = req.params
  const userId = req.user.userId

  const { data: todo } = await supabase
    .from('todos')
    .select('*')
    .eq('id', id)
    .single()

  if (!todo || todo.userId !== userId)
    return res.status(403).json({ error: 'Access denied' })

  const { data } = await supabase
    .from('todos')
    .update(req.body)
    .eq('id', id)
    .select()

  res.json(data)
}

exports.deleteTodo = async (req, res) => {
  const { id } = req.params
  const userId = req.user.userId

  const { data: todo } = await supabase
    .from('todos')
    .select('*')
    .eq('id', id)
    .single()

  if (!todo || todo.userId !== userId)
    return res.status(403).json({ error: 'Access denied' })

  await supabase.from('todos').delete().eq('id', id)
  res.json({ message: 'Todo deleted successfully' })
}
