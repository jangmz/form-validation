const form = document.getElementById ("form");
const pass1 = document.getElementById ("password");
const pass2 = document.getElementById ("password2");
const emailInput = document.getElementById("email");
const zipCode = document.getElementById("zip-code");

let validForm, passwordMatch, emailMatch, zipMatch, strongPass;

emailInput.addEventListener("input", validateEmail);
zipCode.addEventListener("input", validateZip);
pass2.addEventListener("input", validatePasswords);

function validateForm() {
    validForm = form.checkValidity(); // are there any errors?
    console.log ("Form validation: " + validForm);

    if (!validForm) {
        form.setCustomValidity("Please fill out all fields.");
    }
}

function validatePasswords() {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/;
    const clearPass1 = pass1.value;

    if (!(pass1.value === pass2.value)) {
        passwordMatch = false;
        pass1.style.borderColor = "red";
        pass2.style.borderColor = "red";
        pass1.setCustomValidity("");
        pass2.setCustomValidity("Passwords don't match");
    } else {
        passwordMatch = true;
        pass1.style.borderColor = "gray";
        pass2.style.borderColor = "gray";
        pass1.setCustomValidity("");
        pass2.setCustomValidity("");
        console.log("passwords match");

        if (passwordPattern.test(clearPass1)) {
            console.log("strong password");
            strongPass = true;
        } else {
            strongPass = false;
            pass1.setCustomValidity("Password does not meet the safety standards.");
        }
    }
}

function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = emailInput.value;

    if (emailPattern.test(email)) {
        emailInput.setCustomValidity("");
        emailMatch = true;
    } else {
        emailMatch = false;
        emailInput.setCustomValidity("Please enter a valid email address.");
    }
}

function validateZip() {
    const zipPattern = /^[1-9]\d{3}$/;
    const zip = zipCode.value;

    if (zipPattern.test(zip)) {
        zipMatch = true;
        zipCode.setCustomValidity("");
    } else {
        zipMatch = false;
        zipCode.setCustomValidity("Please enter a valid ZIP code.");
    }
}

form.addEventListener ("submit", (e) => {
    e.preventDefault();
    validateForm();
    validatePasswords();
    validateEmail();
    validateZip();

    if (validForm && passwordMatch && emailMatch && zipMatch && strongPass) {
        alert ("Submission successful!");
    }
});