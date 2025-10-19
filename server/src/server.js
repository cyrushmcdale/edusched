import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createPool } from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') ?? true, credentials: true }));
app.use(express.json());

// MySQL pool
const pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'edusched',
  waitForConnections: true,
  connectionLimit: 10,
});

const LoginBody = z.object({
  role: z.enum(['student', 'admin']),
  userId: z.string().min(1),
  password: z.string().min(1),
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.post('/api/auth/login', async (req, res) => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid request', details: parsed.error.flatten() });
  }
  const { role, userId, password } = parsed.data;
  try {
    const table = role === 'student' ? 'Student' : 'Admin';
    const idField = role === 'student' ? 'student_id' : 'admin_id';
    const [rows] = await pool.query(`SELECT ${idField} as id, name, email, password FROM ${table} WHERE ${idField} = ?`, [userId]);
    const user = Array.isArray(rows) && rows.length ? rows[0] : null;
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    // Normally you'd issue JWT/session. For demo, return profile only.
    return res.json({
      role,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
