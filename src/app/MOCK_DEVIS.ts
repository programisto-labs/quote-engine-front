import { Devis } from "./services/devis.service";

export const MOCK_DEVIS: Devis = {
    "nom": "Insurance Document Management System",
    "modules": [
        {
            "nom": "User Management",
            "scenarios": [
                {
                    "nom": "User Registration",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "User Login",
                    "complexite": "medium",
                    "duree": 2.0
                },
                {
                    "nom": "Password Reset",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "User Profile Management",
                    "complexite": "medium",
                    "duree": 4.0
                },
                {
                    "nom": "User Logout",
                    "complexite": "low",
                    "duree": 1.0
                }
            ]
        },
        {
            "nom": "Dashboard and Reporting",
            "scenarios": [
                {
                    "nom": "View Dashboard",
                    "complexite": "low",
                    "duree": 2.0
                },
                {
                    "nom": "View Reports",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Export Data",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Import Data",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Generate Sales Reports",
                    "complexite": "high",
                    "duree": 5.0
                }
            ]
        },
        {
            "nom": "Order Management",
            "scenarios": [
                {
                    "nom": "Add Item to Cart",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Remove Item from Cart",
                    "complexite": "low",
                    "duree": 2.0
                },
                {
                    "nom": "Checkout Process",
                    "complexite": "high",
                    "duree": 5.0
                },
                {
                    "nom": "Apply Discount Code",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Process Payment",
                    "complexite": "high",
                    "duree": 5.0
                },
                {
                    "nom": "Generate Invoice",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Send Order Confirmation Email",
                    "complexite": "low",
                    "duree": 2.0
                },
                {
                    "nom": "Track Order Status",
                    "complexite": "medium",
                    "duree": 4.0
                }
            ]
        },
        {
            "nom": "Admin Management",
            "scenarios": [
                {
                    "nom": "Admin Login",
                    "complexite": "medium",
                    "duree": 2.0
                },
                {
                    "nom": "Admin Dashboard",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Manage Users",
                    "complexite": "high",
                    "duree": 5.0
                },
                {
                    "nom": "Manage Roles and Permissions",
                    "complexite": "high",
                    "duree": 5.0
                },
                {
                    "nom": "View Audit Logs",
                    "complexite": "medium",
                    "duree": 3.0
                }
            ]
        },
        {
            "nom": "Content Management",
            "scenarios": [
                {
                    "nom": "Manage Content",
                    "complexite": "medium",
                    "duree": 4.0
                },
                {
                    "nom": "Create Blog Posts",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Edit Blog Posts",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Delete Blog Posts",
                    "complexite": "low",
                    "duree": 2.0
                },
                {
                    "nom": "Publish Blog Posts",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Manage Comments",
                    "complexite": "medium",
                    "duree": 3.0
                }
            ]
        },
        {
            "nom": "Analytics and Performance Monitoring",
            "scenarios": [
                {
                    "nom": "View Sales Analytics",
                    "complexite": "medium",
                    "duree": 4.0
                },
                {
                    "nom": "Monitor Application Performance",
                    "complexite": "medium",
                    "duree": 4.0
                },
                {
                    "nom": "Generate Database Reports",
                    "complexite": "medium",
                    "duree": 4.0
                }
            ]
        },
        {
            "nom": "System Configuration",
            "scenarios": [
                {
                    "nom": "Configure Application Settings",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Manage Notifications",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Manage API Keys",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Set Up User Authentication",
                    "complexite": "high",
                    "duree": 5.0
                },
                {
                    "nom": "Two-Factor Authentication",
                    "complexite": "high",
                    "duree": 5.0
                },
                {
                    "nom": "Manage Security Settings",
                    "complexite": "high",
                    "duree": 5.0
                }
            ]
        },
        {
            "nom": "Survey and Feedback Management",
            "scenarios": [
                {
                    "nom": "Create Surveys",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Manage Survey Responses",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Generate Survey Reports",
                    "complexite": "medium",
                    "duree": 3.0
                },
                {
                    "nom": "Send Survey Invitations",
                    "complexite": "medium",
                    "duree": 3.0
                }
            ]
        },
        {
            "nom": "Shipping and Payment Configuration",
            "scenarios": [
                {
                    "nom": "Manage Shipping Options",
                    "complexite": "medium",
                    "duree": 4.0
                },
                {
                    "nom": "Manage Payment Methods",
                    "complexite": "medium",
                    "duree": 4.0
                },
                {
                    "nom": "Manage Tax Rates",
                    "complexite": "medium",
                    "duree": 4.0
                },
                {
                    "nom": "Issue Refunds",
                    "complexite": "medium",
                    "duree": 4.0
                }
            ]
        }
    ]
}