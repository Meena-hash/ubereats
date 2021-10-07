import React from "react";
import * as AiIcons from "react-icons/ai";
export const SidebarUserData = [
  {
    title: "Home",
    path: "/user/dashboard",
    icon: <AiIcons.AiFillHome> </AiIcons.AiFillHome>,
    cName: "nav-text",
  },

  {
    title: "Profile",
    path: "/user/profile",
    icon: <AiIcons.AiFillProfile> </AiIcons.AiFillProfile>,
    cName: "nav-text",
  },
  {
    title: "Favourites",
    path: "/user/favourites",
    icon: <AiIcons.AiFillHeart> </AiIcons.AiFillHeart>,
    cName: "nav-text",
  },
  {
    title: "Orders",
    path: "/user/orderhistory",
    icon: <AiIcons.AiOutlineHistory> </AiIcons.AiOutlineHistory>,
    cName: "nav-text",
  },
];
