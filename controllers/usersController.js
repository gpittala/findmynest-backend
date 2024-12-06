const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

const registerUser = async (req, res) => {
  const { name, email, mobile_number, password, university_id } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const userId = await User.create(
      name,
      email,
      mobile_number,
      passwordHash,
      university_id
    );
    res.status(201).json({ id: userId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          mobile_number: user.mobile_number,
          university_id: user.university_id,
        },
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Login failed" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile_number, password, university_id } = req.body;

  try {
    let passwordHash = null;
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.update(
      id,
      name,
      email,
      mobile_number,
      passwordHash,
      university_id
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Failed to update user" });
  }
};

module.exports = { registerUser, loginUser, updateUser };
