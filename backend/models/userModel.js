import pool from '../config/db.js'

export async function createUser({name, email, password_hash}) {
    const result = await pool.query(
        `INSERT INTO users(user_name, user_email, user_password)
        VALUES ($1, $2, $3)
        RETURNING user_id, user_name, user_email`,
        [name, email, password_hash]
    )
    return result.rows[0]
}


export async function findUserByEmail(email) {
    const result = await pool.query(
        `SELECT * FROM users WHERE user_email = $1`,
        [email]
    )
    return result.rows[0]
}