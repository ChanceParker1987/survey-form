document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("surveyForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual form submission

        // Clear any previous error messages
        clearErrors();

        let isValid = true;

        // Validate text fields
        if (!isNotEmpty("name")) isValid = false;
        if (!isValidEmail("email")) isValid = false;
        if (!isValidUsername("username")) isValid = false;

        // Validate radio buttons
        if (!hasCheckedOption("platform")) isValid = false;

        // Validate checkboxes
        if (!hasCheckedCheckbox("genres")) isValid = false;

        // Validate dropdown
        if (!isSelected("favoriteGame")) isValid = false;

        if (isValid) {
            alert("Form submitted successfully!");
            form.submit(); // Submit the form if all validations pass
        }
    });

    // Validation functions
    function isNotEmpty(fieldId) {
        const field = document.getElementById(fieldId);
        if (field.value.trim() === "") {
            showError(field, "This field cannot be empty.");
            return false;
        }
        return true;
    }

    function isValidEmail(fieldId) {
        const field = document.getElementById(fieldId);
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(field.value.trim())) {
            showError(field, "Enter a valid email address.");
            return false;
        }
        return true;
    }

    function isValidUsername(fieldId) {
        const field = document.getElementById(fieldId);
        const usernamePattern = /^[a-zA-Z0-9_]{3,15}$/;
        if (!usernamePattern.test(field.value.trim())) {
            showError(field, "Username must be 3-15 characters (letters, numbers, underscores).");
            return false;
        }
        return true;
    }

    function hasCheckedOption(name) {
        const options = document.getElementsByName(name);
        for (let option of options) {
            if (option.checked) {
                return true;
            }
        }
        showError(options[0], "Please select an option.");
        return false;
    }

    function hasCheckedCheckbox(name) {
        const checkboxes = document.getElementsByName(name);
        for (let checkbox of checkboxes) {
            if (checkbox.checked) {
                return true;
            }
        }
        showError(checkboxes[0], "Please select at least one option.");
        return false;
    }

    function isSelected(fieldId) {
        const field = document.getElementById(fieldId);
        if (field.value === "") {
            showError(field, "Please select an option.");
            return false;
        }
        return true;
    }

    function showError(inputElement, message) {
        let errorSpan = inputElement.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.className = "error-message";
            errorSpan.style.color = "red";
            errorSpan.style.fontSize = "0.9em";
            inputElement.parentElement.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll(".error-message").forEach(error => error.remove());
    }
});

