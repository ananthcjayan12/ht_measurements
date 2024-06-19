document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".store-button").forEach(button => {
        button.addEventListener("click", function () {
            const storeName = this.getAttribute("data-store");
            window.location.href = `/portal/measurement_selection?store=${storeName}`;
        });
    });

    document.getElementById("add-new-store").addEventListener("click", function () {
        window.location.href = `/portal/add_new_store`;
    });

    document.getElementById("search-btn").addEventListener("click", function () {
        const query = document.getElementById("search-input").value;
        // Perform search logic here
    });

    document.getElementById("next-btn").addEventListener("click", function () {
        // Logic for next button
    });
});
