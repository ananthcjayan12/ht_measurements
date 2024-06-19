frappe.ui.form.on('HT Order Submit', {
    refresh(frm) {
        if (!frm.add_new_invoice) {
            console.log("hello");
            frm.add_new_invoice = $(`
                <div>
                    <center>
                        <button class="btn btn-primary" id="add-new-invoice-button"> New Invoice </button>
                    </center>
                </div>
            `).appendTo(frm.fields_dict.add_new_invoice.wrapper);

            $('#add-new-invoice-button').click(function() {
                // Get the selected store from the current form
                let selected_store = frm.doc.store;

                // Fetch the fields dynamically from the HT Invoice doctype
                frappe.model.with_doctype('HT Invoice', function() {
                    let ht_invoice_fields = frappe.get_meta('HT Invoice').fields;
                    console.log(ht_invoice_fields);

                    // Filter out unwanted field types and add the store field with the default value
                    let dialog_fields = ht_invoice_fields.filter(field => {
                        return !['Table', 'Table MultiSelect', 'Section Break', 'Column Break', 'HTML', 'Button'].includes(field.fieldtype);
                    }).map(field => {
                        if (field.fieldname === 'store') {
                            field.default = selected_store;
                            field.hidden = 1;
                        }
                        return field;
                    });

                    // Open HT Invoice form in a dialog modal
                    let d = new frappe.ui.Dialog({
                        title: 'New HT Invoice',
                        fields: dialog_fields,
                        primary_action_label: 'Create',
                        primary_action: function(values) {
                            frappe.call({
                                method: 'frappe.client.insert',
                                args: {
                                    doc: {
                                        doctype: 'HT Invoice',
                                        ...values
                                    }
                                },
                                callback: function(r) {
                                    if (!r.exc) {
                                        frappe.msgprint('HT Invoice created successfully');
                                        d.hide();
                                        frm.set_value('invoice', r.message.name);  // Set the created invoice name in the invoice field
                                        frm.save_or_update();  // Save the HT Order Submit form to store the invoice name
                                        // Refresh the current HT Order Submit form
                                        frm.reload_doc();
                                    }
                                }
                            });
                        }
                    });

                    d.show();
                });
            });
        }

        // Add Shirt Measurement Button
        if (!frm.shirt_measurement_button) {
            frm.shirt_measurement_button = $(`
                <div>
                    <center>
                        <button class="btn btn-primary" id="add-shirt-measurement-button"> New Shirt Measurement </button>
                    </center>
                </div>
            `).appendTo(frm.fields_dict.shirt_measurement_button.wrapper);

            $('#add-shirt-measurement-button').click(function() {
                // Get the selected store from the current form
                let selected_store = frm.doc.store;

                // Fetch the fields dynamically from the Shirt Measurement doctype
                frappe.model.with_doctype('Shirt Measurement', function() {
                    let shirt_measurement_fields = frappe.get_meta('Shirt Measurement').fields;
                    console.log(shirt_measurement_fields);

                    // Filter out unwanted field types and add the store field with the default value
                    let dialog_fields = shirt_measurement_fields.filter(field => {
                        return !['Table', 'Table MultiSelect', 'Section Break', 'Column Break', 'HTML', 'Button'].includes(field.fieldtype);
                    }).map(field => {
                        if (field.fieldname === 'store') {
                            field.default = selected_store;
                            field.hidden = 1;
                        }
                        return field;
                    });

                    // Open Shirt Measurement form in a dialog modal
                    let d = new frappe.ui.Dialog({
                        title: 'New Shirt Measurement',
                        fields: dialog_fields,
                        primary_action_label: 'Create',
                        primary_action: function(values) {
                            frappe.call({
                                method: 'frappe.client.insert',
                                args: {
                                    doc: {
                                        doctype: 'Shirt Measurement',
                                        ...values
                                    }
                                },
                                callback: function(r) {
                                    if (!r.exc) {
                                        frappe.msgprint('Shirt Measurement created successfully');
                                        d.hide();
                                        frm.set_value('shirt_measurement', r.message.name);  // Set the created measurement name in the field
                                        frm.save_or_update();  // Save the HT Order Submit form to store the measurement name
                                        // Refresh the current HT Order Submit form
                                        frm.reload_doc();
                                    }
                                }
                            });
                        }
                    });

                    d.show();
                });
            });
        }
    }
});
