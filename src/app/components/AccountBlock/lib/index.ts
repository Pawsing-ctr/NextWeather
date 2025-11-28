import { TranslationKeys } from "@/app/context/ui/SettingsContext";

interface IAcountHeaderLink {
  id: number;
  titleKey: TranslationKeys;
  href: string;
  className: string;
  activeLinkClassName: string;
  isActive: string;
}

export const AcountHeaderLink: IAcountHeaderLink[] = [
  {
    id: 1,
    titleKey: "account_link_overview",
    href: "/account",
    className: "account-header-link",
    activeLinkClassName: "active-link",
    isActive: "overview",
  },
  {
    id: 2,
    titleKey: "account_link_settings",
    href: "/account/settings",
    className: "account-header-link",
    activeLinkClassName: "active-link",
    isActive: "settings",
  },
  {
    id: 3,
    titleKey: "account_link_signout",
    href: "/signout",
    className: "account-header-link",
    activeLinkClassName: "active-link",
    isActive: "signOut",
  },
];
