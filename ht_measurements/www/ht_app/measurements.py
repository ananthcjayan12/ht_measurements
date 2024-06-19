import frappe

def get_context(context):
    invoice_number = frappe.form_dict.get('invoice_number')
    context.invoice_number = invoice_number

    # Check if measurements are completed
    context.shirt_completed = frappe.db.exists('Shirt Measurement', {'invoice': invoice_number, 'docstatus': 1})
    context.trousers_completed = frappe.db.exists('Ht_Trouser_Measurement', {'invoice': invoice_number, 'docstatus': 1})

    return context
