import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';


const router = express.Router();

// Type Delclarations For Environment Variables
const JWT_SECRET = process.env.JWT_SECRET as string;

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
router.post('/login', async (req: Request, res: Response) => {
    try {
        // Check for Username and Password in the Request Body and will .find the user in the database
        const {username, password} = req.body;
        const user = await User.findOne({ username });

        console.log('Login Attempt For:', username);
        console.log('User Found:', user);

        // In the case User is not found, return an error signaling that the user does not exist
        if (!user) {
            return res.status(400).json({error: 'User Not Found!'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({error: 'Password Mismatch!'})
        }
 
        // Log The Plain Password and The Hashed Password
        console.log('Plain Password:', password);
        console.log('Hashed Password:', user.password);

        // After Succesful Login, Generate JWt Token
        const token = jwt.sign(
            { userId: user._id},
            JWT_SECRET,
            { expiresIn: '2h'} // Will Force The User To Re-Login After 2 Hours
    );
        // Set The JWT Tokan As An HTTP-only Cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript Access
            secure: true, // Use Secure Cookies in Production (HTTPS)
            sameSite: 'none', // Allows CORS
            maxAge: 2 * 60 * 60 * 1000 // 2 Hours for Cookie Expiration
        });

        // Send User Info Back To The Client ( Token Not Included For Security )
        res.json({
            user:{
                username: user.username,
                id: user._id
            }
        });
    
    } catch (err) {
        console.error('Error Logging In The User:', err);
        res.status(500).json({error: 'Server Error During The Login Step!'});
    }
});

/**
 * @route POST /api/auth/logout
 * @desc Clear JWT cookie
 * @access Public
 */

router.post('/Logout', (req: Request, res: Response) => {
    res.clearCookie('token');
    res.json({message: 'User Logged Out Successfully!'});

});

export default router;