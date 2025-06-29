const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = require('../models/UserModel');
require('dotenv').config();

const seedUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        // Check if user already exists
        const existingUser = await UserSchema.findOne({ email: 'abcd@gmail.com' });
        if (existingUser) {
            console.log('User already exists');
            process.exit(0);
        }

        // Create the user
        const user = new UserSchema({
            name: 'Test User',
            email: 'abcd@gmail.com',
            password: 'abcd1234',
            isVerified: true
        });

        await user.save();
        console.log('User created successfully');
        console.log('Email: abcd@gmail.com');
        console.log('Password: abcd1234');
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating user:', error);
        process.exit(1);
    }
};

seedUser();