frappe.ready(function() {
    // Add the button to the HTML field
	console.log("I am ready")
    if (!$("#add-new-invoice-button").length) {
		console.log("in if loop")
        let buttonHTML = `
            <div>
                <center>
                    <button class="btn btn-primary" id="add-new-invoice-button">New Invoice</button>
                </center>
            </div>
        `;
        $('div[data-fieldname="add_invoice"]').append(buttonHTML);
    }

    // Add the click event listener for the button
    $('#add-new-invoice-button').click(function() {
        openDoctypeDialog('HT Invoice', 'invoice');
    });

    function openDoctypeDialog(doctype, targetField) {
        // Get the selected store from the current form
        let selected_store = $('[data-fieldname="store"] input').val();
        let selected_invoice = $('[data-fieldname="invoice"] input').val();

        // Fetch the fields dynamically from the specified doctype
        frappe.model.with_doctype(doctype, function() {
            let fields = frappe.get_meta(doctype).fields;

            // Filter out unwanted field types and add the store field with the default value
            let dialogFields = fields.filter(field => {
                return !['Table', 'Table MultiSelect', 'Section Break', 'Column Break', 'HTML', 'Button'].includes(field.fieldtype);
            }).map(field => {
                if (field.fieldname === 'store') {
                    field.default = selected_store;
                    field.hidden = 1;
                }
                if (field.fieldname === 'invoice') {
                    field.default = selected_invoice;
                    // field.hidden = 1;
                }
                return field;
            });

            // Open doctype form in a dialog modal
            let d = new frappe.ui.Dialog({
                title: `New ${doctype}`,
                fields: dialogFields,
                primary_action_label: 'Create',
                primary_action: function(values) {
                    frappe.call({
                        method: 'frappe.client.insert',
                        args: {
                            doc: {
                                doctype: doctype,
                                ...values
                            }
                        },
                        callback: function(r) {
                            if (!r.exc) {
                                frappe.msgprint(`${doctype} created successfully`);
                                d.hide();
                                // Set the created document name in the target field
                                $('[data-fieldname="' + targetField + '"] input').val(r.message.name);
                            }
                        }
                    });
                }
            });

            d.show();
        });
    }
});
