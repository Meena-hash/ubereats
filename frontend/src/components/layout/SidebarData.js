import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
export const SidebarData = [
  {
    title: "Home",
    path: "/restaurant/profile",
    // icon: <AiIcons.AiFillHome> </AiIcons.AiFillHome>,
    icon: <AiIcons.AiFillProfile> </AiIcons.AiFillProfile>,
    cName: "nav-text",
  },
  // {
  //   title: "Profile",
  //   path: "/restaurant/profile",
  //   icon: <AiIcons.AiFillProfile> </AiIcons.AiFillProfile>,
  //   cName: "nav-text",
  // },
  {
    title: "Dishes",
    path: "/restaurant/dishes",
    icon: <FaIcons.FaMoneyBill> </FaIcons.FaMoneyBill>,
    cName: "nav-text",
  },
  {
    title: "Add Dish",
    path: "/restaurant/add/dishes",
    icon: <FaIcons.FaPalette> </FaIcons.FaPalette>,
    cName: "nav-text",
  },
  {
    title: "Orders",
    path: "/restaurant/orders",
    icon: <FaIcons.FaFirstOrder> </FaIcons.FaFirstOrder>,
    cName: "nav-text",
  },
];
