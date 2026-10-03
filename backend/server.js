import express from 'express';
import cors from 'cors';
import pool from './config/db.js'
import authRoutes from './routes/auth.js';

const PORT = 8000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

try {
    await pool.query('SELECT NOW()')
    console.log("Postgres connected!")
} catch (error) {
    console.error("Database connection error:", error)
    process.exit(1);
}

app.listen(PORT, () => {
    console.log("Server is connected to port: ", PORT);
})
