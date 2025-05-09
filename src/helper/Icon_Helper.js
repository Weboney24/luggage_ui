import { FaCloudUploadAlt, FaDownload, FaUser, FaWeight, FaBarcode, FaClipboardList, FaIdCard } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdEditNote, MdFolderDelete, MdOutlineMonitor, MdDateRange } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { User, BadgeCheck, Calendar, CalendarCheck, CalendarClock, Globe, Mail, PlaneTakeoff, PlaneLanding, Users } from "lucide-react";

const Icon_Helper = {
  ADMIN_DASHBOARD: MdOutlineMonitor,
  ADMIN_UPLOAD: FaCloudUploadAlt,
  ADMIN_ICON: IoMenu,
  EDIT_ICON: MdEditNote,
  DELETE_ICON: MdFolderDelete,
  DOWNLOAD_ICON: FaDownload,
  USER_ICON: FaUser,
  Ticket_Icon: FaTicketAlt,

  User_Icon: User,
  Badge_Icon: BadgeCheck,
  Calendar_Icon: Calendar,
  CalendarCheck_Icon: CalendarCheck,
  CalendarClock_Icon: CalendarClock,
  Globe_Icon: Globe,
  Mail_Icon: Mail,
  PlaneTakeoff_Icon: PlaneTakeoff,
  PlaneLanding_Icon: PlaneLanding,
  Users_Icon: Users,

  PackageSearch_Icon: FaBarcode, // Barcode ID
  ClipboardList_Icon: FaClipboardList, // Booking Serial
  CalendarDays_Icon: MdDateRange, // General Date
  Weight_Icon: FaWeight, // PreWeight
  IdBadge_Icon: FaIdCard, // _id field
};

export default Icon_Helper;
