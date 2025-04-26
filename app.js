const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 4480;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.use('/auth', require('./routes/authRoutes')); // Include authentication routes

// Pages
app.get('/', (req, res) => res.render('index'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/home', (req, res) => {
    res.render('home'); // Ensure home.ejs exists inside the views folder
});



// Start server
app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
