app_name = "ht_measurements"
app_title = "Ht Measurements"
app_publisher = "ananthcjayan12"
app_description = "App designed to help the house of tailors in the automation of their measurements"
app_email = "ananthcjayan@gmail.com"
app_license = "mit"
app_include_css = "/assets/ht_measurements/css/custom.css"
# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/ht_measurements/css/ht_measurements.css"
# app_include_js = "/assets/ht_measurements/js/ht_measurements.js"

# include js, css files in header of web template
# web_include_css = "/assets/ht_measurements/css/ht_measurements.css"
# web_include_js = "/assets/ht_measurements/js/ht_measurements.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "ht_measurements/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "ht_measurements/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "ht_measurements.utils.jinja_methods",
# 	"filters": "ht_measurements.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "ht_measurements.install.before_install"
# after_install = "ht_measurements.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "ht_measurements.uninstall.before_uninstall"
# after_uninstall = "ht_measurements.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "ht_measurements.utils.before_app_install"
# after_app_install = "ht_measurements.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "ht_measurements.utils.before_app_uninstall"
# after_app_uninstall = "ht_measurements.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "ht_measurements.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	# "*": {
	# 	"on_update": "method",
	# 	"on_cancel": "method",
	# 	"on_trash": "method"
	# }
    # "HT Customer_details": {
    #     "before_save": "ht_measurements.ht_measurements.api.v1.update_customer_if_needed"
    # }
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"ht_measurements.tasks.all"
# 	],
# 	"daily": [
# 		"ht_measurements.tasks.daily"
# 	],
# 	"hourly": [
# 		"ht_measurements.tasks.hourly"
# 	],
# 	"weekly": [
# 		"ht_measurements.tasks.weekly"
# 	],
# 	"monthly": [
# 		"ht_measurements.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "ht_measurements.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "ht_measurements.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "ht_measurements.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["ht_measurements.utils.before_request"]
# after_request = ["ht_measurements.utils.after_request"]

# Job Events
# ----------
# before_job = ["ht_measurements.utils.before_job"]
# after_job = ["ht_measurements.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"ht_measurements.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

