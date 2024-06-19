import frappe

def get_context(context):
    context.stores = frappe.get_all('Store', fields=['name'])
    print(context.stores)
    return context
