document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const closePopupButton = document.getElementById("close-popup");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        // Get the user's name
        const name = document.getElementById("name").value;

        // Display the popup with a success message
        showPopup(`Message sent successfully from ${name}`);

        // Reset the form after showing the popup (optional)
        form.reset();
    });

    function showPopup(message) {
        popupText.textContent = message;
        popup.style.display = "block"; // Show the popup

        // Automatically close the popup after 3 seconds
        setTimeout(() => {
            popup.style.display = "none";
        }, 3000);
    }

    // Close the popup when the close button is clicked
    closePopupButton.addEventListener("click", function () {
        popup.style.display = "none";
    });
});
