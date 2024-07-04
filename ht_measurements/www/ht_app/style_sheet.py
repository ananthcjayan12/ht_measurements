import frappe

def get_context(context):
    invoice_number = frappe.form_dict.get('invoice_number')
    profile = frappe.form_dict.get('profile_id')
    context.invoice_number = invoice_number

    # Check if style entries are completed
    context.jacket_completed = frappe.db.exists('Jacket Style Sheet', {'invoice': invoice_number, 'profile': profile,'docstatus': 1})
    context.shirt_completed = frappe.db.exists('Shirt Style Sheet', {'invoice': invoice_number, 'profile': profile,'docstatus': 1})
    context.trouser_completed = frappe.db.exists('Trouser Style Sheet', {'invoice': invoice_number, 'profile': profile,'docstatus': 1})

    return context
