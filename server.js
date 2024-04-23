const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Dummy user data for demonstration purposes
let users = [];

// Route handler for login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Route handler for handling login form submission
app.post('/login', (req, res) => {
    const { emailOrPhone, password } = req.body;
    const user = users.find(user => user.emailOrPhone === emailOrPhone && user.password === password);
    if (user) {
        res.send('Login successful!');
    } else {
        res.send('Invalid email/phone or password. Please try again.');
    }
});

// Route handler for sign up page
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/sign-up.html');
});

// Route handler for handling sign up form submission
app.post('/signup', (req, res) => {
    const { name, phoneNumber, occupation, email, password, paymentMethod } = req.body;
    // Create a new user object and add it to the users array
    const newUser = { name, phoneNumber, occupation, email, password, paymentMethod };
    users.push(newUser);
    res.send('Account created successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
