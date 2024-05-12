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
    function displayTrips(tripsArray) {
        tripContainer.innerHTML = ''; // Clear previous trip elements
        tripsArray.forEach(trip => {
            const tripElement = createTripElement(trip);
            tripContainer.appendChild(tripElement);
        });
    }

    // Function to filter trips based on search input
    function filterTrips(searchInput) {
        const filteredTrips = trips.filter(trip => trip.destination.toLowerCase().includes(searchInput.toLowerCase().trim()));
        return filteredTrips;
    }

    // Get the search button element
    const searchButton = document.getElementById('searchButton');

    // Add a click event listener to the search button
    searchButton.addEventListener('click', function() {
        // Get the current location and destination input values
        const currentLocationInput = document.getElementById('currentLocation').value.toLowerCase().trim();
        const destinationInput = document.getElementById('destination').value.toLowerCase().trim();
        
        // Filter trips based on destination input
        const filteredTrips = filterTrips(destinationInput);

        // Display filtered trips
        displayTrips(filteredTrips);
    });
});
