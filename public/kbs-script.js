document.addEventListener('DOMContentLoaded', function() {
    const tripContainer = document.getElementById('tripContainer');
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const searchButton = document.getElementById('searchButton');
    const currentLocationInput = document.getElementById('currentLocation');
    const destinationInput = document.getElementById('destination');
    const busResults = document.getElementById('busResults');

    // Array of trip objects with destination and price
    const trips = [
        { destination: "Nyabugogo - Kimironko", price: 700 },
        { destination: "Kimoronko - Downtown", price: 500 },
        { destination: "Nyabugogo - Kabuga", price: 900 },
        // Add more trip objects as needed
    ];

    let currentUser = null; // Represents the currently signed-in user

    // Function to generate HTML for each trip
    function createTripElement(trip) {
        const tripElement = document.createElement('div');
        tripElement.classList.add('trip');

        const destinationElement = document.createElement('h3');
        destinationElement.textContent = trip.destination;

        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: ${formatPrice(trip.price)} RWF`;
        priceElement.classList.add('price');

        const bookButton = document.createElement('button');
        bookButton.textContent = "Book Now";
        bookButton.classList.add('book-now-button');
        bookButton.addEventListener('click', function() {
            if (isLoggedIn()) {
                const paymentMode = prompt("Choose payment mode: MTN Mobile Money, Airtel Money, Visa Card, Other");
                if (paymentMode) {
                    alert(`Booking trip to ${trip.destination} for ${formatPrice(trip.price)} RWF with ${paymentMode}`);
                } else {
                    alert("Please choose a payment mode.");
                }
            } else {
                alert("Please sign in or sign up before booking.");
            }
        });

        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('details');
        detailsContainer.appendChild(destinationElement);
        detailsContainer.appendChild(priceElement);

        tripElement.appendChild(detailsContainer);
        tripElement.appendChild(bookButton);

        return tripElement;
    }

    // Function to display trips on the home page
    function displayTrips(tripsArray) {
        // Clear existing trip container content
        tripContainer.innerHTML = '';

        tripsArray.forEach(function(trip) {
            const tripElement = createTripElement(trip);
            tripContainer.appendChild(tripElement);
        });
    }

    // Function to search for bus routes based on current location and destination
    function searchBusRoutes() {
        const currentLocation = currentLocationInput.value.trim();
        const destination = destinationInput.value.trim();

        // Perform search based on current location and destination (dummy implementation)
        const searchResults = trips.filter(trip =>
            trip.destination.toLowerCase().includes(destination.toLowerCase())
        );

        // Display search results
        displayTrips(searchResults);
    }

    // Function to sign in
    function signIn(event) {
        event.preventDefault(); // Prevent default form submission
        const emailOrPhone = document.getElementById('emailOrPhone').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Perform client-side validation
        if (!emailOrPhone || !password) {
            alert("Please enter both email/phone and password.");
            return;
        }

        // Send login request to server using Fetch API or XMLHttpRequest
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailOrPhone, password })
        })
        .then(response => {
            if (response.ok) {
                // Redirect to home page or another location
                window.location.href = 'index.html';
            } else {
                // Handle login failure
                alert("Login failed. Please check your credentials.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred. Please try again later.");
        });
    }

    // Function to sign up
    function signUp(event) {
        event.preventDefault(); // Prevent default form submission
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const paymentMethod = document.getElementById('paymentMethod').value;

        // Perform client-side validation
        if (!name || !email || !password || !phoneNumber || !paymentMethod) {
            alert("Please fill in all fields.");
            return;
        }

        // Send signup request to server using Fetch API or XMLHttpRequest
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, phoneNumber, paymentMethod })
        })
        .then(response => {
            if (response.ok) {
                // Redirect to home page or another location
                window.location.href = 'index.html';
            } else {
                // Handle signup failure
                alert("Sign up failed. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred. Please try again later.");
        });
    }

    // Function to check if user is logged in
    function isLoggedIn() {
        return currentUser !== null;
    }

    // Function to format price in RWF
    function formatPrice(price) {
        return new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF' }).format(price);
    }

    // Event listeners for form submissions
    document.getElementById('loginForm').addEventListener('submit', signIn);
    document.getElementById('signupForm

