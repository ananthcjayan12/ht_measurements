import frappe

def execute ():
    # Fetch all submitted entries in the "Trouser Measurement" DocType
    trouser_measurements = frappe.get_all('Trouser Measurement', filters={'docstatus': 1}, fields=['name'])
    
    for measurement in trouser_measurements:
        try:
            # Cancel the document
            doc = frappe.get_doc('Trouser Measurement', measurement.name)
            doc.cancel()
            
            # Delete the document
            frappe.delete_doc('Trouser Measurement', measurement.name)
            
            frappe.db.commit()
        except Exception as e:
            frappe.log_error(f"Failed to cancel and delete Trouser Measurement {measurement.name}: {str(e)}", "Trouser Measurement Patch")

# Run the patch

