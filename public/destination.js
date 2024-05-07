document.addEventListener('DOMContentLoaded', function() {
    const tripContainer = document.getElementById('tripContainer');

    // Array of trip objects with destination and price
    const trips = [
        { destination: "Nyabugogo - Kimironko", price: 700 },
        { destination: "Kimoronko - Downtown", price: 500 },
        { destination: "Nyabugogo - Kabuga", price: 900 },
        { destination: "KABUGA-MULINDI-REMERA -SONATUBES-RWANDEX-NYABUGOGO", price: 470 },
        { destination: "KABUGA-MULINDI-REMERA-SONATUBES-RWANDEX-CBD", price: 470 },
        { destination: "KANOMBE -Airport-REMERA -CHEZ LANDO-KACYIRU-NYABUGOGO", price: 340 },
        { destination: "KANOMBE -Airport-REMERA -SONATUBES-RWANDEX-CBD", price: 340 },
        { destination: "KANOMBE-AIRPORT-REMERA-CHEZ LANDO-KIMIHURURA-CBD", price: 330 },
        { destination: "KICUKIRO-SONATUBES-REMERA-AIRPORT-KANOMBE", price: 200 },
        { destination: "MASAKA-MASAKA HOSPITAL-KABUGA", price: 100 },
        { destination: "MASAKA- RUSHESHE", price: 200 },
        { destination: "REMERA -12-MASORO(UAAC)", price: 200 },
        { destination: "REMERA-NYARUGUNGA-BUSANZA", price: 300 },
        { destination: "REMERA -15-NDERA - MUSAVE", price: 300 },
        { destination: "REMERA -CHEZ LANDO-KACYIRU-NYABUGOGO", price: 230 },
        { destination: "REMERA -RUBILIZI-BUSANZA", price: 150 },
        { destination: "REMERA -MULINDI-MASAKA", price: 250 },
        { destination: "REMERSONATUBES-KICUKIRO CENTRE", price: 150 },
        { destination: "REMERA -SONATUBES-RWANDEX-CBD", price: 200 },
        { destination: "REMERA -SONATUBES-RWANDEX-GIKONDO-BWERANKOLI", price: 200 },
        { destination: "REMERA-12-SEZ", price: 200 },
        { destination: "REMERA-KANOMBE -KIBAYA", price: 150 },
        { destination: "REMERA-MULINDI-KABUGA", price: 270 },
        { destination: "REMERA-SONATUBES-RWANDEX-NYABUGOGO", price: 200 },
        { destination: "RUBILIZI-REMERA-CHEZ LANDO-KACYIRU-NYABUGOGO", price: 320 },
        { destination: "RUBILIZI-REMERA-SONATUBES-RWANDEX-CBD", price: 310 },
        { destination: "REMERA - MULINDI - GASOGI (CYARUZINGE)", price: 300 }
    ];

    // Function to generate HTML for each trip
    function createTripElement(trip) {
        const tripElement = document.createElement('div');
        tripElement.classList.add('trip');

        const destinationElement = document.createElement('p');
        destinationElement.textContent = `Destination: ${trip.destination}`;

        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: RWF ${trip.price}`;

        tripElement.appendChild(destinationElement);
        tripElement.appendChild(priceElement);

        return tripElement;
    }

    // Function to display trips on the home page
    function displayTrips() {
        trips.forEach(trip => {
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

    // Get the search button element
    const searchButton = document.getElementById('searchButton');

    // Add a click event listener to the search button
    searchButton.addEventListener('click', function() {
        // Get the search input value
        const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
        
        // Clear previous search results
        tripContainer.innerHTML = '';

        // Filter trips based on search input
        const filteredTrips = trips.filter(trip => trip.destination.toLowerCase().includes(searchInput));

        // Display filtered trips
        filteredTrips.forEach(trip => {
            const tripElement = createTripElement(trip);
            tripContainer.appendChild(tripElement);
        });
    });

    // Call updateButtons to initially set button visibility
    updateButtons();
});
