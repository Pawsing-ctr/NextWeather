import { translations } from "../context/types/SettingsTypes";

type TranslationKey = keyof typeof translations.en;

interface IBlogCards {
  id: number;
  cardTitle: TranslationKey;
  cardDescription: TranslationKey;
  cardShortDescription: TranslationKey;
  firtAnotherCard: TranslationKey;
  secondAnotherCard: TranslationKey;
  bigImagesrc: string;
  smallImageSrcOne: string;
  smallImageSrcTwo: string;
}

export const newsCard: IBlogCards[] = [
  {
    id: 1,
    cardTitle: "newsCardTitle1",
    cardDescription: "newsCardDesc1",
    cardShortDescription: "newsCardShortDesc1",
    firtAnotherCard: "newsCardAnother1_1",
    secondAnotherCard: "newsCardAnother1_2",
    bigImagesrc: "/Deep_Analytics.jpg",
    smallImageSrcOne: "/tiger_1.jpg",
    smallImageSrcTwo: "/forecast.jpg",
  },
  {
    id: 2,
    cardTitle: "newsCardTitle2",
    cardDescription: "newsCardDesc2",
    cardShortDescription: "newsCardShortDesc2",
    firtAnotherCard: "newsCardAnother2_1",
    secondAnotherCard: "newsCardAnother2_2",
    bigImagesrc: "/curr_w.jpeg",
    smallImageSrcOne: "/Atmospheric.jpg",
    smallImageSrcTwo: "/sunny_sun.jpg",
  },
  {
    id: 3,
    cardTitle: "newsCardTitle3",
    cardDescription: "newsCardDesc3",
    cardShortDescription: "newsCardShortDesc3",
    firtAnotherCard: "newsCardAnother3_1",
    secondAnotherCard: "newsCardAnother3_2",
    bigImagesrc: "/storm.webp",
    smallImageSrcOne: "/vis.jpg",
    smallImageSrcTwo: "/myname.webp",
  },
  {
    id: 4,
    cardTitle: "newsCardTitle4",
    cardDescription: "newsCardDesc4",
    cardShortDescription: "newsCardShortDesc4",
    firtAnotherCard: "newsCardAnother4_1",
    secondAnotherCard: "newsCardAnother4_2",
    bigImagesrc: "/map.png",
    smallImageSrcOne: "/storm_2.webp",
    smallImageSrcTwo: "/climate.webp",
  },
  {
    id: 5,
    cardTitle: "newsCardTitle5",
    cardDescription: "newsCardDesc5",
    cardShortDescription: "newsCardShortDesc5",
    firtAnotherCard: "newsCardAnother5_1",
    secondAnotherCard: "newsCardAnother5_2",
    bigImagesrc: "/snowy.jpg",
    smallImageSrcOne: "/web_things.webp",
    smallImageSrcTwo: "/tommorw.jpg",
  },
  {
    id: 6,
    cardTitle: "newsCardTitle6",
    cardDescription: "newsCardDesc6",
    cardShortDescription: "newsCardShortDesc6",
    firtAnotherCard: "newsCardAnother6_1",
    secondAnotherCard: "newsCardAnother6_2",
    bigImagesrc: "/weather_234.webp",
    smallImageSrcOne: "/webik.jpg",
    smallImageSrcTwo: "/snow1223.jpg",
  },
];
