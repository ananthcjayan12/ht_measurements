import frappe

def get_context(context):
    invoice_number = frappe.form_dict.get('invoice_number')
    context.invoice_number = invoice_number
    return context
