frappe.ui.form.on('HT Order Submit', {
    refresh(frm) {
        if (!frm.add_new_invoice) {
            frm.add_new_invoice = createButton('New Invoice', 'add-new-invoice-button', 'HT Invoice', 'invoice', frm,'add_new_invoice');
        }

        if (!frm.shirt_measurement_button) {
            frm.shirt_measurement_button = createButton('New Shirt Measurement', 'add-shirt-measurement-button', 'Shirt Measurement', 'shirt_measurement', frm,'shirt_measurement_button');
        }
    }
});

function createButton(label, buttonId, doctype, targetField, frm,target_wrapper) {
    let button = $(`
        <div>
            <center>
                <button class="btn btn-primary" id="${buttonId}"> ${label} </button>
            </center>
        </div>
    `).appendTo(frm.fields_dict[buttonId] ? frm.fields_dict[buttonId].wrapper : frm.fields_dict[target_wrapper].wrapper);

    $(`#${buttonId}`).click(function() {
        openDoctypeDialog(doctype, targetField, frm);
    });

    return button;
}

function openDoctypeDialog(doctype, targetField, frm) {
    // Get the selected store from the current form
    let selected_store = frm.doc.store;
    let selected_invoice = frm.doc.invoice;

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
                            frm.set_value(targetField, r.message.name);  // Set the created document name in the target field
                            frm.save_or_update();  // Save the HT Order Submit form to store the document name
                            // Refresh the current HT Order Submit form
                            frm.reload_doc();
                        }
                    }
                });
            }
        });

        d.show();
    });
}
