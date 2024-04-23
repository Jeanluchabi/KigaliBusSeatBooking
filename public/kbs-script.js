// script.js

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const currentLocationInput = document.getElementById('currentLocation');
    const destinationInput = document.getElementById('destination');
    const busResults = document.getElementById('busResults');

    searchButton.addEventListener('click', function() {
        const currentLocation = currentLocationInput.value.trim();
        const destination = destinationInput.value.trim();

        // Perform bus search based on currentLocation and destination
        // For demonstration purposes, let's just display a static message
        const message = `Showing buses from ${currentLocation} to ${destination}`;
        busResults.innerHTML = `<p>${message}</p>`;
    });
});

