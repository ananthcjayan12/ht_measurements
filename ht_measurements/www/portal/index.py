import frappe
def get_context(context):
    context.stores = frappe.get_all('Store', fields=['name'])
    return context