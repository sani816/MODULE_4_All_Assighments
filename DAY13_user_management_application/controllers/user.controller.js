import { supabase } from "../config/supabase.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

/* CREATE USER */
export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, age, role } = req.body;

  try {
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("users").insert([
      {
        name,
        email,
        password: hashedPassword,
        age,
        role,
      },
    ]);

    if (error) throw error;

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ALL USERS */
export const getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, age, role, created_at");

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET USER BY ID */
export const getUserById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, age, role, created_at")
      .eq("id", req.params.id)
      .single();

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* UPDATE USER */
export const updateUser = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(req.body)
      .eq("id", req.params.id)
      .select();

    if (!data.length) {
      return res.status(404).json({ message: "User not found" });
    }

    if (error) throw error;

    res.json({ message: "User updated successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* DELETE USER */
export const deleteUser = async (req, res) => {
  try {
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
