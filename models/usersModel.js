const db = require("../config/db");

const User = {
  create: async (name, email, mobile_number, password_hash, university_id) => {
    const [result] = await db.query(
      "INSERT INTO users (name, email, mobile_number, password_hash, university_id) VALUES (?, ?, ?, ?, ?)",
      [name, email, mobile_number, password_hash, university_id]
    );
    return result.insertId;
  },
  findByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },
  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },
  update: async (
    id,
    name,
    email,
    mobile_number,
    password_hash,
    university_id
  ) => {
    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push("name = ?");
      updateValues.push(name);
    }
    if (email) {
      updateFields.push("email = ?");
      updateValues.push(email);
    }
    if (mobile_number) {
      updateFields.push("mobile_number = ?");
      updateValues.push(mobile_number);
    }
    if (password_hash) {
      updateFields.push("password_hash = ?");
      updateValues.push(password_hash);
    }
    if (university_id) {
      updateFields.push("university_id = ?");
      updateValues.push(university_id);
    }

    updateValues.push(id);

    if (updateFields.length === 0) {
      return null;
    }

    const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
    const [result] = await db.query(query, updateValues);

    if (result.affectedRows > 0) {
      return await User.getById(id);
    }
    return null;
  },
};

module.exports = User;
