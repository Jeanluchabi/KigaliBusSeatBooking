const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
    // Handle login form submission
    const { emailOrPhone, password } = req.body;
    // Authenticate user here
    // Redirect or send response accordingly
    res.redirect('/');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/sign-up.html');
});

app.post('/signup', (req, res) => {
    // Handle signup form submission
    const { name, phoneNumber, occupation, email, password, paymentMethod } = req.body;
    // Save user data to database or perform signup process
    // Redirect or send response accordingly
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
