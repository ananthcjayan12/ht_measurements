import frappe

def get_context(context):
    invoice_number = frappe.form_dict.get('invoice_number')
    context.invoice_number = invoice_number

    # Check if the invoice number exists in the HT Invoice doctype
    invoice_exists = frappe.db.exists('HT Invoice', {'invoice_number': invoice_number})
    print(" I am here")
    print(invoice_exists)

    if not invoice_exists:
        context.no_invoice_message = f'No invoice present with number {invoice_number}'
        context.is_invoice_exists=False
        context.shirt_completed = False
        context.trousers_completed = False
    else:
        # Check if measurements are completed
        context.is_invoice_exists=True
        context.shirt_completed = frappe.db.exists('Shirt Measurement', {'invoice': invoice_number, 'docstatus': 1})
        context.trousers_completed = frappe.db.exists('Trouser Measurement', {'invoice': invoice_number, 'docstatus': 1})

    return context
