import frappe

def get_context(context):
    store = frappe.form_dict.get('store')
    context.store = store
    return context
