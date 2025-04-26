const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User'); // Import User model
const jwt = require('jsonwebtoken');

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.redirect('/login'); // Redirect to login after successful registration
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Login route
router.post('/login', async (req, res) => {
    console.log('Login Attempt:', req.body); // Debug request body

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        console.log('User not found'); // Debugging
        return res.status(400).send('User not found');
    }

    console.log('Stored Password:', user.password); // Debug stored password
    console.log('Entered Password:', password); // Debug entered password

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log('Password does not match'); // Debug password check
        return res.status(400).send('Invalid credentials');
    }

    console.log('Login Successful');
    res.redirect('/home');
});


module.exports = router;
