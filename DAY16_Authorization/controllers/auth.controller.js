const supabase = require('../config/supabase')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const { error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }])

    if (error) return res.status(400).json({ error: error.message })

    res.status(201).json({ message: 'User registered successfully' })
  } catch {
    res.status(500).json({ error: 'Signup failed' })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ token })
  } catch {
    res.status(500).json({ error: 'Login failed' })
  }
}
