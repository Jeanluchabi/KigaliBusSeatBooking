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
 // Function to handle the change event on the payment method select element
 document.getElementById('paymentMethod').addEventListener('change', function() {
    var phoneInput = document.getElementById('phoneInput');
    var creditCardInput = document.getElementById('creditCardInput');

    // Reset display styles
    phoneInput.style.display = 'none';
    creditCardInput.style.display = 'none';

    // Show/hide input fields based on selected payment method
    if (this.value === 'MTN' || this.value === 'Airtel') {
        phoneInput.style.display = 'block';
    } else if (this.value === 'Visa') {
        creditCardInput.style.display = 'block';
    }
});

// Function to handle the click event on the add balance button
document.getElementById('addBalanceButton').addEventListener('click', function() {
    // Retrieve form data
    var balanceAmount = document.getElementById('balanceAmount').value;
    var paymentMethod = document.getElementById('paymentMethod').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var creditCardNumber = document.getElementById('creditCardNumber').value;
    var creditCardExpiry = document.getElementById('creditCardExpiry').value;

    // Perform validation
    if (balanceAmount === '' || isNaN(balanceAmount)) {
        alert('Please enter a valid balance amount.');
        return;
    }

    if (paymentMethod === 'MTN' || paymentMethod === 'Airtel') {
        if (phoneNumber === '') {
            alert('Please enter your phone number.');
            return;
        }
    } else if (paymentMethod === 'Visa') {
        if (creditCardNumber === '' || creditCardExpiry === '') {
            alert('Please enter your credit card details.');
            return;
        }
    }

    // Add balance logic here (e.g., sending data to the server)
    // Assuming successful balance addition, close the modal
    var modal = document.getElementById('addBalanceModal');
    var bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();

    // Reset form fields after successful submission
    document.getElementById('balanceAmount').value = '';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('creditCardNumber').value = '';
    document.getElementById('creditCardExpiry').value = '';
    document.getElementById('paymentMethod').value = '';
});

