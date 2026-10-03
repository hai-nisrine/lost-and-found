import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { findUserByEmail, createUser} from '../models/userModel.js'

const SALT_ROUNDS = 10

export async function signup(req, res) {
    try {
        const {name, email, password} = req.body

        if (!name || ! email || !password) {
            return res.status(400).json({
                error: "Name, email, and password are required"
            })
        }

        const existingUser = await findUserByEmail(email)

        if (existingUser) {
            return res.status(409).json({
                error: "Email is taken"
            })
        }


        const password_hash = await bcrypt.hash(password, SALT_ROUNDS)

        const newUser = await createUser({name, email, password_hash})

        const token = jwt.sign(
            { userId: newUser.user_id},
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN}
        )

        return res.status(201).json({
            user: newUser,
            token
        })






    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Something went wrong"
        })

    }










}