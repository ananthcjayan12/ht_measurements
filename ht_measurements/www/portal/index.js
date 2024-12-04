document.addEventListener("DOMContentLoaded", function () {
    const formContainer = document.getElementById('form-container');

    document.getElementById("store-selection-form").addEventListener("submit", function (e) {
        e.preventDefault();
        var store = document.getElementById("store").value;
        window.location.href = `/portal/invoice_form?store=${store}`;
    });

    // Additional logic to handle subsequent form submissions can be added here
});