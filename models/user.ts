import mongoose from 'mongoose';

// User Interface extneding to mongoose document
export interface IUser extends mongoose.Document{
    username: string;
    password: string;
    createdAt?: Date; // optional, will be added by mongoose
}

// User Schema for MongoDB
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true, 
        minlength: 3 // minumum length for username
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // minimum length for password
        maxlength: 75 // maximum length for password
    }
}, {timestamps: true}); // will add createdAt and updatedAt fields to the schema
