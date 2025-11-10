import { IAcountHeaderLink } from "../type";

export const AcountHeaderLink: IAcountHeaderLink[] = [
  {
    id: 1,
    title: "Overview",
    href: "/account",
    className: "account-header-link",
    activeLinkClassName: "active-link",
    isActive: "overview",
  },
  {
    id: 2,
    title: "Settings",
    href: "/account/settings",
    className: "account-header-link",
    activeLinkClassName: "active-link",
    isActive: "settings",
  },
  {
    id: 3,
    title: "Sign out",
    href: "/signout",
    className: "account-header-link",
    activeLinkClassName: "active-link",
    isActive: "signOut",
  },
];
