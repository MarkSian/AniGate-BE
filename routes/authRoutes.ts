import express, { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
import User from '../models/user';


const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Basic Validation Check For Username and Password
        if (!username || !password) {
            return res.status(400).json({error: 'Username and Password are Required'})
        }

        // Check If Username Already Exists
        const existingUser = await User.findOne({ username});
        if (existingUser) {
            return res.status(400).json({error: 'Username Already Exists'})
        }

        // Create A New User Instance And Save It
        const newUser = new User({ username, password}); // Password Will Be Hashed Automatically From The User Model Import
        await newUser.save();
        res.status(201).json({ message: 'User Registered Successful!'});
    } catch (err) {
        console.error('Error Registering User:', err);
        res.status(500).json({error: 'Server Error During The Registration Step!'});
    }

});


/**
 * @route POST /api/auth/login
 * @desc Authenticate user and get JWT token in HTTP-only cookie
 * @access Public
 */






/**
 * @route POST /api/auth/logout
 * @desc Clear JWT cookie
 * @access Public
 */

export default router;