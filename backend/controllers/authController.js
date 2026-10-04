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


export async function login(req, res) {

    //reads email and password from req.body
    //validates both exists (theyre both filled)
    //find the user by email
    //compare password to hashed
    //sign a token
    //send back user + token

    try {

    const {email, password}  = req.body
    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required"
        })
    }

    const existingUser = await findUserByEmail(email)

    if (!existingUser) {
        return res.status(401).json({
            error: "Invalid email or password"
        })
    } 
        const storedHash = existingUser.user_password
        const match = await bcrypt.compare(password, storedHash)
        if (!match) {
            return res.status(401).json({
                error: "Invalid email or password"
            })
        }

    const token = jwt.sign(
        { userId: existingUser.user_id},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN}
    )

    return res.status(200).json(
        {
         user: {  userId: existingUser.user_id,
            userName: existingUser.user_name,
            userEmail: existingUser.user_email
        },
        
        token
    }
    )

} catch (err) {
    console.error(err)
    res.status(500).json({
        error: "Something went wrong"
    })
}



}