import { translations } from "../context/types/SettingsTypes";

type TranslationKey = keyof typeof translations.en;

export interface ISearch {
  id: number;
  title: TranslationKey;
  link: string;
}

export const searchData: ISearch[] = [
  {
    id: 1,
    title: "createAccLink",
    link: "/auth",
  },
  {
    id: 2,
    title: "readNewsLink",
    link: "/news",
  },
  {
    id: 3,
    title: "weatherLink",
    link: "/",
  },
  {
    id: 4,
    title: "startingLink",
    link: "/",
  },
  {
    id: 5,
    title: "registrationLink",
    link: "/registration",
  },
  {
    id: 6,
    title: "languagesLink",
    link: "/",
  },
  {
    id: 7,
    title: "creatorsLink",
    link: "https://github.com/Pawsing-ctr/NextWeather",
  },
  {
    id: 8,
    title: "dailyLink",
    link: "/news",
  },
];
