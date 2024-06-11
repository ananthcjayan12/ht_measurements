# Custom report script for tailoring measurements

import frappe
from frappe import _

def execute(filters=None):
    columns, data = [], []

    columns = get_columns()
    data = get_data(filters)

    return columns, data

def get_columns():
    return [
        {"fieldname": "invoice_number", "label": _("Invoice Number"), "fieldtype": "Link", "options": "HT Invoice", "width": 120},
        {"fieldname": "name", "label": _("Customer Name"), "fieldtype": "Data", "width": 120},
        {"fieldname": "delivery_date", "label": _("Delivery Date"), "fieldtype": "Date", "width": 120},
        {"fieldname": "gender", "label": _("Gender"), "fieldtype": "Data", "width": 80},
        {"fieldname": "store", "label": _("Store"), "fieldtype": "Link", "options": "Store", "width": 100},
        {"fieldname": "shirt_measurements", "label": _("Shirt Measurements"), "fieldtype": "Data", "width": 200},
        {"fieldname": "trouser_measurements", "label": _("Trouser Measurements"), "fieldtype": "Data", "width": 200},
    ]

def get_data(filters):
    data = []
    invoices = frappe.get_all("HT Invoice", fields=["name1", "delivery_date", "gender", "invoice_number", "store"])

    for invoice in invoices:
        shirt_measurements = frappe.get_value("Shirt Measurement", {"invoice": invoice.invoice_number}, ["full_length", "shoulder", "chest"])
        trouser_measurements = frappe.get_value("Trouser Measurement", {"invoice": invoice.invoice_number}, ["full_length", "waist", "hip"])

        data.append({
            "invoice_number": invoice.invoice_number,
            "name": invoice.name1,
            "delivery_date": invoice.delivery_date,
            "gender": invoice.gender,
            "store": invoice.store,
            "shirt_measurements": format_measurements(shirt_measurements),
            "trouser_measurements": format_measurements(trouser_measurements),
        })
    
    return data

def format_measurements(measurements):
    if measurements:
        return ", ".join([f"{key}: {value}" for key, value in measurements.items()])
    return ""