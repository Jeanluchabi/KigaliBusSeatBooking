const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('./db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/kigali-bus-booking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});

// Define user schema
const userSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    occupation: String,
    email: String,
    password: String,
    paymentMethod: String
});

// Create User model
const User = mongoose.model('User', userSchema);

// Route handler for login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route handler for handling login form submission
app.post('/login', async (req, res) => {
    const { emailOrPhone, password } = req.body;
    try {
        // Find user by email or phone number
        const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }] });
        if (user && user.password === password) {
            res.send('Login successful!');
        } else {
            res.send('Invalid email/phone or password. Please try again.');
        }
    } catch (error) {
        console.error('Error occurred during login:', error);
        res.status(500).send('An error occurred during login.');
    }
});

// Route handler for sign up page
app.get('/sign-up', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sign-up.html'));
});

// Route handler for handling sign up form submission
app.post('/sign-up', async (req, res) => {
    const { name, phoneNumber, occupation, email, password, paymentMethod } = req.body;
    try {
        // Create a new user
        const newUser = new User({ name, phoneNumber, occupation, email, password, paymentMethod });
        // Save the new user to the database
        await newUser.save();
        res.send('Account created successfully! You can now <a href="/login">login</a>.');
    } catch (error) {
        console.error('Error occurred during sign-up:', error);
        res.status(500).send('An error occurred during sign-up.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
