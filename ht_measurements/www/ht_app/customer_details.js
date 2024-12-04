

document.addEventListener("DOMContentLoaded", function () {
    // Load all customers initially
    loadCustomerList();

    // Filter customers on search input
    document.getElementById("customer_search").addEventListener("input", function () {
        const query = this.value.toLowerCase();
        const items = document.getElementById("customer_list").getElementsByClassName("dropdown-item");
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? "block" : "none";
        }
    });

    // Handle customer selection
    document.getElementById("customer_list").addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("dropdown-item")) {
            const customerId = e.target.getAttribute("data-id");
            const customerName = e.target.textContent;
            document.getElementById("customer_id_1").value = customerId;
            document.getElementById("customerDropdown").textContent = customerName;
            loadCustomerDetails(customerId);
        }
    });

    // Handle form submission
    document.getElementById("customer-details-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const customerId = document.getElementById("customer_id_1").value;
        if (customerId) {
            checkAndUpdateCustomerDetails(customerId, data);
            console.log(" I am here")
        } else {
            createNewCustomerAndInvoice(data);
        }
    });
    document.getElementById("create-customer").addEventListener("click", function () {
        const d = new frappe.ui.Dialog({
            title: 'Create New Customer',
            fields: [
                {
                    label: 'Customer Name',
                    fieldname: 'customer_name',
                    fieldtype: 'Data',
                    reqd: 1
                },
                {
                    label: 'Phone Number',
                    fieldname: 'phone_number',
                    fieldtype: 'Data',
                    reqd: 1
                },
                {
                    label: 'Gender',
                    fieldname: 'gender',
                    fieldtype: 'Select',
                    options: 'Male\nFemale\nTransgender\nOthers',
                    reqd: 1
                }
            ],
            primary_action_label: 'Create',
            primary_action: function(values) {
                frappe.call({
                    method: "frappe.client.insert",
                    args: {
                        doc: {
                            doctype: "HT Customer_details",
                            customer_name: values.customer_name,
                            phone_number: values.phone_number,
                            gender: values.gender
                        }
                    },
                    callback: function (r) {
                        if (r.message) {
                            const customerId = r.message.name;
                            const customerName = r.message.customer_name;
                            const customerPhone = r.message.phone_number;
                            addCustomerOption(customerId, customerName, customerPhone);
                            document.getElementById("customer_id").value = customerId;
                            document.getElementById("customerDropdown").textContent = `${customerName} (${customerPhone})`;
                            document.getElementById("name1").value = customerName;
                            document.getElementById("phone_number").value = customerPhone;
                            document.getElementById("gender").value = r.message.gender || '';
                            d.hide();
                        } else {
                            frappe.msgprint("There was an error creating the customer. Please try again.");
                        }
                    }
                });
            }
        });
        d.show();
    });
    
    
    // Function to load customer list
    function loadCustomerList() {
        frappe.call({
            method: "frappe.client.get_list",
            args: {
                doctype: "HT Customer_details",
                fields: ["name", "customer_name", "phone_number"],
                limit_page_length: 1000  // Adjust limit as needed
            },
            callback: function (r) {
                if (r.message) {
                    const customerList = document.getElementById("customer_list");
                    r.message.forEach(function (customer) {
                        addCustomerOption(customer.name, customer.customer_name, customer.phone_number);
                    });
                } else {
                    console.error("No customers found"); // Added for debugging
                }
            },
            error: function (r) {
                console.error(r); // Added for debugging
            }
        });
    }

    // Function to add customer option
    function addCustomerOption(id, name, phone) {
        const customerList = document.getElementById("customer_list");
        const option = document.createElement("a");
        option.classList.add("dropdown-item");
        option.textContent = `${name} (${phone})`;
        option.setAttribute("data-id", id);
        customerList.appendChild(option);
    }

    // Function to load customer details
    function loadCustomerDetails(customerId) {
        frappe.call({
            method: "frappe.client.get",
            args: {
                doctype: "HT Customer_details",
                name: customerId
            },
            callback: function (r) {
                if (r.message) {
                    const customer = r.message;
                    document.getElementById("name1").value = customer.customer_name || '';
                    document.getElementById("phone_number").value = customer.phone_number || '';
                    document.getElementById("gender").value = customer.gender || '';
                }
            }
        });
    }
        // Function to check and update customer details
    function checkAndUpdateCustomerDetails(customerId, data) {
            frappe.call({
                method: "ht_measurements.ht_measurements.api.v1.update_customer_if_needed",
                args: {
                    customer_id: customerId,
                    new_data: JSON.stringify({
                        customer_name: data.name1,
                        phone_number: data.phone_number,
                        gender: data.gender
                    })
                },
                callback: function (r) {
                    createOrUpdateInvoice(customerId, data);
                }
            });
        }
    

    function createOrUpdateInvoice(customerId, data) {
        console.log("creating or updating ....")
        console.log(data)
        frappe.call({
            method: "frappe.client.insert",
            args: {
                doc: {
                    doctype: "HT Invoice",
                    customer: customerId,
                    name1: data.name1,
                    delivery_date: data.delivery_date,
                    gender: data.gender,
                    invoice_number: data.invoice_number,
                    trial_date: data.trial_date,
                    phone_number: data.phone_number,
                    store: new URLSearchParams(window.location.search).get('store')
                }
            },
            callback: function (r) {
                if (r.message) {
                    console.log(r.message)
                    window.location.href = `/ht_app/measurements?invoice_number=${data.invoice_number}`;
                } else {
                    alert("There was an error saving the invoice. Please try again.");
                }
            }
        });
    }

    function createNewCustomerAndInvoice(data) {
        frappe.call({
            method: "frappe.client.insert",
            args: {
                doc: {
                    doctype: "HT Customer_details",
                    customer_name: data.name1,
                    phone_number: data.phone_number,
                    gender: data.gender
                }
            },
            callback: function (r) {
                if (r.message) {
                    createOrUpdateInvoice(r.message.name, data);
                } else {
                    alert("There was an error saving the customer details. Please try again.");
                }
            }
        });
    }
});
