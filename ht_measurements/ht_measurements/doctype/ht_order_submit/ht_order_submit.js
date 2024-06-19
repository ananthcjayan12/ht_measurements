frappe.ui.form.on('HT Order Submit', {
    refresh(frm) {
        if (!frm.add_new_invoice) {
            frm.add_new_invoice = createButton('New Invoice', 'add-new-invoice-button', 'HT Invoice', 'invoice', frm, 'add_new_invoice');
        }

        if (!frm.shirt_measurement_button) {
            frm.shirt_measurement_button = createButton('New Shirt Measurement', 'add-shirt-measurement-button', 'Shirt Measurement', 'shirt_measurement', frm, 'shirt_measurement_button');
        }
    }
});

function createButton(label, buttonId, doctype, targetField, frm, target_wrapper) {
    let button = $(`
        <div class="card" style="margin: 20px; padding: 20px; border: 1px solid #d1d8dd; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <div class="card-body">
                <center>
                    <button class="btn btn-primary" id="${buttonId}" style="font-size: 16px; padding: 10px 20px;"> ${label} </button>
                </center>
            </div>
        </div>
    `).appendTo(frm.fields_dict[target_wrapper].wrapper);

    $(`#${buttonId}`).click(function() {
        openDoctypeDialog(doctype, targetField, frm);
    });

    return button;
}

function openDoctypeDialog(doctype, targetField, frm) {
    let selected_store = frm.doc.store;
    let selected_invoice = frm.doc.invoice;

    frappe.model.with_doctype(doctype, function() {
        let fields = frappe.get_meta(doctype).fields;

        let dialogFields = fields.filter(field => {
            return !['Table', 'Table MultiSelect', 'Section Break', 'Column Break', 'HTML', 'Button'].includes(field.fieldtype);
        }).map(field => {
            if (field.fieldname === 'store') {
                field.default = selected_store;
                field.hidden = 1;
            }
            if (field.fieldname === 'invoice') {
                field.default = selected_invoice;
            }
            return field;
        });

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
                            frm.set_value(targetField, r.message.name);
                            frm.save_or_update();
                            frm.reload_doc();
                        }
                    }
                });
            }
        });

        d.show();
    });
}
