console.log("hello")
frappe.ready(function() {
    // Function to populate store dropdown
    function loadStores() {
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Store',
                fields: ['name', 'branch_name']
            },
            callback: function(data) {
                var select = $('#store-select');
                data.message.forEach(function(store) {
                    $('<option>', { value: store.name, text: store.branch_name }).appendTo(select);
                });
            }
        });
    }

    window.loadInvoiceForm = function() {
        var selectedStore = $('#store-select').val();
        $('#invoice-form').show().siblings('.form-step').hide();
        // Assuming 'invoice_number' is a field in 'HT Invoice'
        $('#invoice-form').html(`<label>Invoice Number:</label><input type="text" id="invoice-number"><input type="hidden" id="selected-store" value="${selected_store}">`);
    };

    window.loadMeasurementForm = function() {
        var invoiceNumber = $('#invoice-number').val();
        $('#measurement-form').show().siblings('.form-step').hide();
        // Build your measurement form dynamically based on the selected invoice
        $('#measurement-form').html(`<label>Measurements for Invoice ${invoiceNumber}:</label><input type="text" placeholder="Enter Measurement">`);
    };

    window.submitAllData = function() {
        // Implement submission logic for your data
        console.log("Submitting all data...");
        // Here you can make API calls to create or update records in your Frappe backend
    };

    loadStores();  // Load stores as soon as the page is ready
});
