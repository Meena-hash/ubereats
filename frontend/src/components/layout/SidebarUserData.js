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
    title: "profile",
    path: "/user/profile",
    icon: <AiIcons.AiFillProfile> </AiIcons.AiFillProfile>,
    cName: "nav-text",
  },
  {
    title: "favourites",
    path: "/user/favourites",
    icon: <AiIcons.AiFillHeart> </AiIcons.AiFillHeart>,
    cName: "nav-text",
  },
];
