// kbs-script.js

document.addEventListener('DOMContentLoaded', function() {
    const tripContainer = document.getElementById('tripContainer');
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

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
    function displayTrips() {
        trips.forEach(function(trip) {
            const tripElement = createTripElement(trip);
            tripContainer.appendChild(tripElement);
        });
    }

    // Function to sign in
    function signIn() {
        window.location.href = 'login.html'; // Redirect to login page
    }

    // Function to sign up
    function signUp() {
        window.location.href = 'sign-up.html'; // Redirect to sign up page
    }

    // Function to check if user is logged in
    function isLoggedIn() {
        return currentUser !== null;
    }

    // Function to format price in RWF
    function formatPrice(price) {
        return new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF' }).format(price);
    }

    // Event listener for the login button
    loginButton.addEventListener('click', signIn);

    // Event listener for the sign up button
    signupButton.addEventListener('click', signUp);

    // Call the displayTrips function to populate the home page with trips
    displayTrips();
});
