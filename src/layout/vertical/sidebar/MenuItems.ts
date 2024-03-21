import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconBoxMultiple,
  IconPoint,
  IconAperture,
  IconAmbulance,
  IconTower,
  IconCat,
  IconEyeQuestion,
  IconAddressBook,
  IconRosette,
  IconLicense,
} from "@tabler/icons-react";

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconAperture,
    href: "/",
    chip: "New",
    chipColor: "secondary",
  },
  {
    navlabel: true,
    subheader: "Other",
  },
  {
    id: uniqueId(),
    title: "Doctors",
    icon: IconAmbulance,
    href: "/doctor",
  },
  {
    id: uniqueId(),
    title: "Pets Owner",
    icon: IconTower,
    href: "/pets-owner",
  },
  {
    id: uniqueId(),
    title: "Pets",
    icon: IconCat,
    href: "/pets",
  },
  {
    id: uniqueId(),
    title: "Guests",
    icon: IconEyeQuestion,
    href: "/guests",
  },
  {
    id: uniqueId(),
    title: "Contacts Message",
    icon: IconAddressBook,
    href: "/contacts-message",
  },
  {
    id: uniqueId(),
    title: "Role",
    icon: IconRosette,
    href: "/role",
  },
  {
    id: uniqueId(),
    title: "Permission",
    icon: IconLicense,
    href: "/permission",
  },
];

export default Menuitems;
