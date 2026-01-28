import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/* ---------------- SIGNUP API ---------------- */

app.post("/signup", async (req, res) => {
  try {
    const { name, email, age, location, password } = req.body;

    // Validation
    if (!name || !email || !age || !location || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from("usersss")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const { error } = await supabase.from("usersss").insert([
      {
        name,
        email,
        age,
        location,
        password: hashedPassword
      }
    ]);

    if (error) throw error;

    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

/* ---------------- USER PROFILE API ---------------- */

app.get("/myprofile", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Name query parameter required" });
    }

    const { data, error } = await supabase
      .from("usersss")
      .select("id, name, email, age, location")
      .eq("name", name)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
