// permissions.js
const permissions = {
  Admin: {
    routes: [
      {
        path: "/admin",
        label: "Dashboard",
        icon: "FaTachometerAlt",
      },
      {
        path: "/admin/user-management",
        label: "User Management",
        icon: "FaUser",
      },
      {
        path: "/catalogue",
        label: "Catalogue Management",
        icon: "FaBook",
      },
      {
        path: "/admin/category",
        label: "Category Management",
        parent: "/catalogue",
      },
      {
        path: "/admin/product",
        label: "Products Management",
        parent: "/catalogue",
      },
      {
        path: "/admin/vendor-management",
        label: "Vendor Management",
        icon: "FaUsers",
      },
      {
        path: "/admin/inventory-management",
        label: "Inventory Management",
        icon: "FaWarehouse",
      },
      {
        path: "/admin/order-management",
        label: "Order Management",
        icon: "FaShoppingCart",
      },
    ],
    components: [
      "AdminUserManagement",
      "AdminVendorManagement",
      "AdminInventoryManagement",
      "AdminDashboard",
      "AdminCategoryManagement",
      "AdminProductManagement",
      "AdminVendorManagement",
    ],
    //actions: ["CREATE_USER", "DELETE_USER", "VIEW_REPORTS"],
  },
  Vendor: {
    routes: [
      {
        path: "/vendor",
        label: "Dashboard",
        icon: "FaTachometerAlt",
      },
      {
        path: "/catalogue",
        label: "Catalogue Management",
        icon: "FaBook",
      },
      {
        path: "/vendor/product-management",
        label: "Product Management",
        parent: "/catalogue",
      },
      {
        path: "/vendor/inventory",
        label: "Inventory",
        icon: "FaWarehouse",
      },
      // Add more routes as needed
    ],
    components: ["ProductManagement", "InventoryManagement", "VendorDashboard"],
    //actions: ["CREATE_PRODUCT", "UPDATE_PRODUCT", "VIEW_ORDERS"],
  },
  CSR: {
    routes: [
      {
        path: "/csr",
        label: "Dashboard",
        icon: "FaTachometerAlt",
      },
      {
        path: "/csr/order-management",
        label: "Order Management",
        icon: "FaClipboardList",
      },
      {
        path: "/csr/account-activation",
        label: "Account Activation",
        icon: "FaUser",
      },
      // Add more routes as needed
    ],
    components: ["OrderManagement", "AccountActivation", "CSRDashboard"],
    //actions: ["APPROVE_ACCOUNT", "CANCEL_ORDER", "UPDATE_ORDER_STATUS"],
  },
};

export default permissions;
