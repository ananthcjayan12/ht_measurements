
import frappe
import json

@frappe.whitelist()
def update_customer_if_needed(customer_id, new_data):
    print(f"Received new_data: {new_data}")
    if isinstance(new_data, str):
        try:
            new_data = json.loads(new_data)  # Parse the string into a dictionary if it's a string
        except json.JSONDecodeError:
            frappe.throw("Invalid JSON data received.")
    print(f"Parsed new_data: {new_data}")

    customer = frappe.get_doc("HT Customer_details", customer_id)
    updated_fields = {}
    for field, value in new_data.items():
        if field in customer.as_dict() and customer.get(field) != value:
            updated_fields[field] = value

    if updated_fields:
        customer.update(updated_fields)
        customer.save()
        frappe.db.commit()

    return updated_fields
