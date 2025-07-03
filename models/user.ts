import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


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

// Hash Password Before Saving The User
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// Create Const User from the userSchema and export it
const User = mongoose.model<IUser>('User', userSchema);
export default User;