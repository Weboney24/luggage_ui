import Icon_Helper from "./Icon_Helper";

export const Admin_side_menu = [
  {
    id: 1,
    name: "Dashboard",
    icon: Icon_Helper.ADMIN_DASHBOARD,
    to: "/admin-dashboard",
  },
  {
    id: 2,
    name: "Excel",
    icon: Icon_Helper.ADMIN_UPLOAD,
    to: "/admin-uploadexcelsheet",
  },
  {
    id: 3,
    name: "User",
    icon: Icon_Helper.USER_ICON,
    to: "/user_data",
  },
];
