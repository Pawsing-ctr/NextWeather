import { translations } from "../context/types/SettingsTypes";

type TranslationKey = keyof typeof translations.en;
export interface Ad {
  id: number;
  title: string;
  description: TranslationKey;
  image: string;
  link: string;
}

export const adsData: Ad[] = [
  {
    id: 1,
    title: "Eminem — The Death Of Slim Shady",
    description: "eminemAdDesc",
    image: "/Eminem_The_Death.png",
    link: "https://music.apple.com/album/the-death-of-slim-shady-coup-de-gr%C3%A2ce/1755022177",
  },
  {
    id: 2,
    title: "Aliexpress",
    description: "aliAdDesc",
    image: "/ali.png",
    link: "https://www.aliexpress.com/",
  },
  {
    id: 3,
    title: "Davinci Resolve",
    description: "davinciAdDesc",
    image: "/DaVinci.png",
    link: "https://www.blackmagicdesign.com/products/davinciresolve",
  },
  {
    id: 4,
    title: "Nest JS",
    description: "nestAdDesc",
    image: "/NestJs.png",
    link: "https://nestjs.com/",
  },
  {
    id: 5,
    title: "Telegram",
    description: "telegramAdDesc",
    image: "/Telegram.webp",
    link: "https://web.telegram.org/",
  },
];
