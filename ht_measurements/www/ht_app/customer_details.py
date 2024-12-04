import frappe

def get_context(context):
    context.store = frappe.form_dict.get('store')
    return context
