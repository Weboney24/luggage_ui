import Icon_Helper from "./Icon_Helper";

export const tickets = [
  {
    name: "John Doe",
    ticket_id: "10000-ITA-2025-359-1",
    date: "2025-04-28",
    from: "Rome (FCO)",
    to: "Berlin (TXL)",
    extra_luggage: true,
    extra_luggage_weight: 5,
    extra_luggage_price: 50,
  },
  {
    name: "Alice Smith",
    ticket_id: "10000-ITA-2025-359-2",
    date: "2025-04-28",
    from: "Rome (FCO)",
    to: "Berlin (TXL)",
    extra_luggage: false,
    extra_luggage_weight: 0,
    extra_luggage_price: 0,
  },
  {
    name: "Michael Johnson",
    ticket_id: "10000-ITA-2025-359-3",
    date: "2025-04-28",
    from: "Rome (FCO)",
    to: "Berlin (TXL)",
    extra_luggage: true,
    extra_luggage_weight: 10,
    extra_luggage_price: 100,
  },
  {
    name: "Emily Davis",
    ticket_id: "10000-ITA-2025-359-4",
    date: "2025-04-28",
    from: "Rome (FCO)",
    to: "Berlin (TXL)",
    extra_luggage: true,
    extra_luggage_weight: 10,
    extra_luggage_price: 100,
  },
  {
    name: "David Lee",
    ticket_id: "10000-ITA-2025-359-5",
    date: "2025-04-28",
    from: "Rome (FCO)",
    to: "Berlin (TXL)",
    extra_luggage: false,
    extra_luggage_weight: 0,
    extra_luggage_price: 0,
  },
];

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
