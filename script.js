document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("surveyForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual form submission

        // Clear previous error messages
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

        // Prevent submission if any validation fails
        if (!isValid) {
            return; // Stop execution, form does NOT submit
        }

        // If all validations pass, submit form
        alert("Form submitted successfully!");
        form.submit();
    });

    // Checks if a field is empty
    function isNotEmpty(fieldId) {
        const field = document.getElementById(fieldId);
        if (field.value.trim() === "") {
            showError(field, "This field cannot be empty.");
            return false;
        }
        return true;
    }

    // Validates email format using regex
    function isValidEmail(fieldId) {
        const field = document.getElementById(fieldId);
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(field.value.trim())) {
            showError(field, "Enter a valid email address.");
            return false;
        }
        return true;
    }

    // Validates username (letters, numbers, underscores, 3-15 chars)
    function isValidUsername(fieldId) {
        const field = document.getElementById(fieldId);
        const usernamePattern = /^[a-zA-Z0-9_]{3,15}$/;
        if (!usernamePattern.test(field.value.trim())) {
            showError(field, "Username must be 3-15 characters (letters, numbers, underscores).");
            return false;
        }
        return true;
    }

    // Checks if a radio button is selected
    function hasCheckedOption(name) {
        const options = document.getElementsByName(name);
        for (let option of options) {
            if (option.checked) {
                return true;
            }
        }
        showError(options[0].parentElement, "Please select an option."); // Show error near first option
        return false;
    }

    // Checks if at least one checkbox is selected
    function hasCheckedCheckbox(name) {
        const checkboxes = document.getElementsByName(name);
        for (let checkbox of checkboxes) {
            if (checkbox.checked) {
                return true;
            }
        }
        showError(checkboxes[0].parentElement, "Please select at least one option.");
        return false;
    }

    // Checks if a dropdown option is selected
    function isSelected(fieldId) {
        const field = document.getElementById(fieldId);
        if (field.value === "") {
            showError(field, "Please select an option.");
            return false;
        }
        return true;
    }

    // Displays error message next to invalid input
    function showError(inputElement, message) {
        let errorSpan = inputElement.nextElementSibling;

        // Create error span if it doesn’t exist
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.className = "error-message";
            errorSpan.style.color = "red";
            errorSpan.style.fontSize = "0.9em";
            errorSpan.style.display = "block";
            errorSpan.style.marginTop = "5px";
            errorSpan.setAttribute("aria-live", "polite"); // Accessibility improvement
            inputElement.parentElement.appendChild(errorSpan);
        }

        errorSpan.textContent = message;
    }

    // Clears all previous error messages
    function clearErrors() {
        document.querySelectorAll(".error-message").forEach(error => error.remove());
    }
});


