const pool = require('@/config/database');

class Task {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY created_at;');
    return rows;
  }

  async findOne(id) {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?;', id);
    return rows[0];
  }

  async create(title) {
    const [result] = await pool.query(
      'INSERT INTO tasks (title) VALUES (?);',
      title
    );

    const task = await this.findOne(result.insertId);
    return task;
  }

  async update(id, data) {
    const [result] = await pool.query(
      'UPDATE tasks SET title = ?, completed = ? WHERE id = ?;',
      [data.title, data.completed, id]
    );

    return { affectedRows: result.affectedRows };
  }

  async destroy(id) {
    await pool.query('DELETE FROM tasks WHERE id = ?;', id);
    return null;
  }
}

module.exports = new Task();
