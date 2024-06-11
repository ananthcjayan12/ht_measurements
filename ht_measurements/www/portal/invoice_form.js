document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("invoice-form").addEventListener("submit", function (e) {
        e.preventDefault();
        var formData = new FormData(e.target);
        var data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        frappe.call({
            method: "frappe.client.insert",
            args: {
                doc: {
                    doctype: "HT Invoice",
                    name1: data.name1,
                    delivery_date: data.delivery_date,
                    invoice_number: data.invoice_number,
                    trial_date: data.trial_date,
                    gender: data.gender,
                    store: data.store
                }
            },
            callback: function (r) {
                window.location.href = `/portal/shirt_measurement?invoice_number=${r.message.invoice_number}`;
            }
        });
    });
});
