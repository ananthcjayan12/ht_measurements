import frappe
def get_context(context):
    context.invoice_number = frappe.form_dict.get('invoice_number')
    return context