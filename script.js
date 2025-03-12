document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("surveyForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission until validation passes
        clearErrors();

        let isValid = true;

        if (!isNotEmpty("name")) isValid = false;
        if (!isValidEmail("email")) isValid = false;
        if (!isValidUsername("username")) isValid = false;
        if (!isNotEmpty("birthdate")) isValid = false;
        if (!isPositiveNumber("gamingHours")) isValid = false;
        if (!hasCheckedOption("platform")) isValid = false;
        if (!hasCheckedOption("genres")) isValid = false;
        if (!isSelected("favoriteGame")) isValid = false;

        if (isValid) form.submit();
    });

    function isNotEmpty(fieldId) {
        const field = document.getElementById(fieldId);
        if (field.value.trim() === "") {
            showError(fieldId, "This field cannot be empty.");
            return false;
        }
        return true;
    }

    function isValidEmail(fieldId) {
        const field = document.getElementById(fieldId);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value)) {
            showError(fieldId, "Please enter a valid email address.");
            return false;
        }
        return true;
    }

    function isValidUsername(fieldId) {
        const field = document.getElementById(fieldId);
        const usernamePattern = /^[a-zA-Z0-9_]{3,15}$/;
        if (!usernamePattern.test(field.value)) {
            showError(fieldId, "Username must be 3-15 characters long and contain only letters, numbers, and underscores.");
            return false;
        }
        return true;
    }

    function isPositiveNumber(fieldId) {
        const field = document.getElementById(fieldId);
        if (isNaN(field.value) || field.value < 0) {
            showError(fieldId, "Please enter a valid positive number.");
            return false;
        }
        return true;
    }

    function hasCheckedOption(name) {
        const options = document.getElementsByName(name);
        for (let option of options) {
            if (option.checked) return true;
        }
        showError(name + "Error", "Please select an option.");
        return false;
    }

    function isSelected(fieldId) {
        const field = document.getElementById(fieldId);
        if (field.value === "") {
            showError(fieldId, "Please select an option.");
            return false;
        }
        return true;
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + "Error");
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add("error-visible");
        }
    }

    function clearErrors() {
        document.querySelectorAll(".error-message").forEach(error => {
            error.textContent = "";
            error.classList.remove("error-visible");
        });
    }
});