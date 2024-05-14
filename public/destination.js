document.addEventListener('DOMContentLoaded', function() {
    // Get the trip container element
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
        { destination: "REMERASONATUBES-KICUKIRO CENTRE", price: 150 },
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
        // Add event listener to scroll to the book now button when destination is clicked
        destinationElement.addEventListener('click', function() {
            const bookNowButton = document.querySelector('.btn-book-now');
            bookNowButton.style.display = 'block';
            bookNowButton.scrollIntoView({ behavior: 'smooth' });
        });

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
        // Get the destination input value
        const destinationInput = document.getElementById('destination').value.toLowerCase().trim();
        
        // Filter trips based on destination input
        const filteredTrips = filterTrips(destinationInput);

        // Display filtered trips
        displayTrips(filteredTrips);
    });

    // Get the "Book Now" button element in the header
    const bookNowButtonHeader = document.querySelector('.btn-book-now-header');

    // Add a click event listener to the "Book Now" button in the header
    bookNowButtonHeader.addEventListener('click', function() {
        const tripSection = document.getElementById('find-your-bus-section');
        tripSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Get the "Book Now" button element
    const bookNowButton = document.querySelector('.btn-book-now');

    // Add a click event listener to the "Book Now" button
    bookNowButton.addEventListener('click', function() {
        // Perform booking logic here...
        alert('Booking functionality will be implemented here.');
    });
});

// Function to toggle the menu
function toggleMenu() {
    var menuContent = document.getElementById('menuContent');
    if (menuContent.style.display === 'block') {
        menuContent.style.display = 'none';
    } else {
        menuContent.style.display = 'block';
    }
}

// Function to show specific content section
function showContent(contentId) {
    // Hide all content sections
    var contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(function(section) {
        section.style.display = 'none';
    });

    // Show the selected content section
    var selectedContent = document.querySelector('.' + contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}

// Function to display the sign-in form for the account section
function showAccountForm() {
    hideForms(); // Hide all forms
    var signInForm = document.getElementById('signInForm');
    signInForm.style.display = 'block';
}

// Function to display the register form for the account section
function showRegisterForm() {
    hideForms(); // Hide all forms
    var registerForm = document.getElementById('registerForm');
    registerForm.style.display = 'block';
}

// Function to display the reset password form
function showResetPasswordForm() {
    hideForms(); // Hide all forms
    var resetPasswordForm = document.getElementById('resetPasswordForm');
    resetPasswordForm.style.display = 'block';
}

// Function to hide all forms
function hideForms() {
    var forms = document.querySelectorAll('.sign-in-form, .register-form, .reset-password-form');
    forms.forEach(function(form) {
        form.style.display = 'none';
    });
}

// Function to show the sign-in form when closing reset password form
function showSignInForm() {
    var signInForm = document.getElementById('signInForm');
    signInForm.style.display = 'block';
}

// Make all forms movable with cursor
var forms = document.querySelectorAll('.sign-in-form, .register-form, .reset-password-form');
forms.forEach(function(form) {
    form.addEventListener('mousedown', function(e) {
        var posX = e.clientX;
        var posY = e.clientY;
        var formLeft = form.offsetLeft;
        var formTop = form.offsetTop;
        var diffX = posX - formLeft;
        var diffY = posY - formTop;
        
        document.addEventListener('mousemove', moveForm);
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', moveForm);
        });

        function moveForm(e) {
            var posX = e.clientX;
            var posY = e.clientY;
            form.style.left = (posX - diffX) + 'px';
            form.style.top = (posY - diffY) + 'px';
        }
    });
});

// Show home content by default when the page loads
window.onload = function() {
    showContent('home-content');
};

// Background carousel effect
var carouselItems = document.querySelectorAll('#carousel-container .carousel-item');
var currentIdx = 0;

function nextItem() {
    carouselItems[currentIdx].classList.remove('active');
    currentIdx = (currentIdx + 1) % carouselItems.length;
    carouselItems[currentIdx].classList.add('active');
    setTimeout(nextItem, 5000); // Change image every 5 seconds
}

// Start the carousel effect
nextItem();
