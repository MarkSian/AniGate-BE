import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieparser from 'cookie-parser';



// Import Routes and Middleware
import authRoutes from './routes/authRoutes';


// Load environment variables from .env
dotenv.config(); 

// Type Delclarations For Environment Variables
const CLIENT_URL = process.env.CLIENT_URL as string;
const MONGO_URI = process.env.MONGO_URI as string;
const PORT = Number(process.env.PORT) || 5000; 

// Create the Express Application
const app = express(); 

// Connect to Frontend Client URL
app.use(cors({origin: CLIENT_URL, credentials: true})); 

// Parse JSON Request Bodies
app.use(express.json()); 

// Parse HTTP-Only cookies
app.use(cookieparser()); 

// Routes

// Authenticatoin Routes ( /api/auth/register, /api/auth/login )
app.use('/api/auth', authRoutes);

// Database Connection
const dataBaseConnection  = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to Database Successfully...');
        
    } catch (err) {
        console.error('Database connection error:', err);
    }
};

// Start The Server
const serverStart = async () => {
    try {
        await dataBaseConnection();
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`)
        });

    } catch (err) {
        console.error('Error starting the server:', err);
    }
};

serverStart();