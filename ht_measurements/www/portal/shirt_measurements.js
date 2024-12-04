document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("shirt-measurement-form").addEventListener("submit", function (e) {
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
                    doctype: "Shirt Measurement",
                    invoice: data.invoice,
                    full_length: data.full_length,
                    shoulder: data.shoulder,
                    arm_hole: data.arm_hole,
                    sleeve: data.sleeve,
                    bicep: data.bicep,
                    chest: data.chest,
                    lower_chest: data.lower_chest,
                    stomach: data.stomach,
                    hip: data.hip,
                    collar: data.collar,
                    cross_back: data.cross_back,
                    jacket_length: data.jacket_length,
                    jacket_sleeve: data.jacket_sleeve,
                    add_your_suggestions_and_remarks_here: data.add_your_suggestions_and_remarks_here
                }
            },
            callback: function (r) {
                if (r.message) {
                    alert("Shirt measurements saved successfully.");
                } else {
                    alert("There was an error saving the measurements. Please try again.");
                }
            }
        });
    });
});
