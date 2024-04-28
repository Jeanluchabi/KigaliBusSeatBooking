document.addEventListener('DOMContentLoaded', function() {
    const tripContainer = document.getElementById('tripContainer');

    // Check if the user is logged in and show appropriate buttons
    updateButtons();

    // Array of trip objects with destination and price
    const trips = [
        { destination: "Nyabugogo - Kimironko", price: 700 },
        { destination: "Kimoronko - Downtown", price: 500 },
        { destination: "Nyabugogo - Kabuga", price: 900 },
        // Add more trip objects as needed
    ];

    // Function to generate HTML for each trip
    function createTripElement(trip) {
        // Code for creating trip element
    }

    // Function to display trips on the home page
    function displayTrips() {
        // Code for displaying trips
    }

    // Function to sign in
    function signIn() {
        window.location.href = 'login.html'; // Redirect to login page
    }

    // Function to sign up
    function signUp() {
        window.location.href = 'sign-up.html'; // Redirect to sign up page
    }

    // Function to log out
    async function logout() {
        try {
            // Call your server logout endpoint to clear the user's session
            await fetch('/logout', {
                method: 'POST',
                credentials: 'same-origin' // Include cookies in the request
            });
            // Redirect the user to the login page after logout
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Error occurred during logout:', error);
            // Display an error message to the user
        }
    }

    // Function to check if user is logged in and update buttons accordingly
    async function updateButtons() {
        try {
            // Make a request to your server to check the user's authentication status
            const response = await fetch('/check-authentication', {
                method: 'GET',
                credentials: 'same-origin' // Include cookies in the request
            });
            const isLoggedIn = await response.json();
            
            const loginButton = document.querySelector('.nav-link[href="login.html"]');
            const signupButton = document.querySelector('.nav-link[href="sign-up.html"]');
            const logoutButton = document.getElementById('logoutButton');

            if (isLoggedIn) {
                if (loginButton) loginButton.style.display = 'none';
                if (signupButton) signupButton.style.display = 'none';
                if (logoutButton) logoutButton.style.display = 'inline-block';
            } else {
                if (loginButton) loginButton.style.display = 'inline-block';
                if (signupButton) signupButton.style.display = 'inline-block';
                if (logoutButton) logoutButton.style.display = 'none';
            }

            // Event listener for the login button
            if (loginButton) {
                loginButton.addEventListener('click', signIn);
            }

            // Event listener for the sign up button
            if (signupButton) {
                signupButton.addEventListener('click', signUp);
            }

            // Event listener for the logout button
            if (logoutButton) {
                logoutButton.addEventListener('click', logout);
            }
        } catch (error) {
            console.error('Error occurred during authentication check:', error);
            // Display an error message to the user
        }
    }

    // Call the displayTrips function to populate the home page with trips
    displayTrips();
});
