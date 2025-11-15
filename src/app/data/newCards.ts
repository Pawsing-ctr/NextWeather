interface IBlogCards {
  id: number;
  cardTitle: string;
  cardDescription: string;
  cardShortDescription: string;
  firtAnotherCard: string;
  secondAnotherCard: string;
  bigImagesrc: string;
  smallImageSrcOne: string;
  smallImageSrcTwo: string;
}

export const newsCard: IBlogCards[] = [
  {
    id: 1,
    cardTitle: "Deep analysis",
    cardDescription:
      "A summary from our weather forecasters with precipitation probabilities",
    cardShortDescription: "Even for you",
    firtAnotherCard:
      "Raw data, neural network and expert comments for maximum accuracy.",
    secondAnotherCard:
      "Precipitation forecast: Probability, intensity, and start/end time based on the model.",
    bigImagesrc: "/Deep_Analytics.jpg",
    smallImageSrcOne: "/tiger_1.jpg",
    smallImageSrcTwo: "/forecast.jpg",
  },
  {
    id: 2,
    cardTitle: "MEX Express",
    cardDescription: "Current Weather and Key Facts for the Day",
    cardShortDescription: "Simple, perfect, just see",
    firtAnotherCard:
      "Atmospheric Fronts: Accurate maps of mass movement and collision.",
    secondAnotherCard:
      "From sunrise to sunset: temperature, cloud cover, and the perfect time for a walk.",
    bigImagesrc: "/curr_w.jpeg",
    smallImageSrcOne: "/Atmospheric.jpg",
    smallImageSrcTwo: "/sunny_sun.jpg",
  },
  {
    id: 3,
    cardTitle: "Crazy Weather",
    cardDescription:
      "Storm warnings, red danger levels, and viral videos of thunderstorms.",
    cardShortDescription: "So far, so crazy, so best ",
    firtAnotherCard:
      "Visibility and Fog: Current conditions for drivers and passengers.",
    secondAnotherCard: "Weather Records: When the Climate Goes Beyond Normal",
    bigImagesrc: "/storm.webp",
    smallImageSrcOne: "/vis.jpg",
    smallImageSrcTwo: "/myname.webp",
  },
  {
    id: 4,
    cardTitle: "New Forecast Model",
    cardDescription:
      "Stay up-to-date with the latest technological weather forecasting.",
    cardShortDescription: "New weather right now",
    firtAnotherCard:
      "Storm Archive: The Most Destructive Hurricanes of Recent Decades.",
    secondAnotherCard:
      "Climate Change: How 2025 broke all previous heat records.",
    bigImagesrc: "/map.png",
    smallImageSrcOne: "/storm_2.webp",
    smallImageSrcTwo: "/climate.webp",
  },
  {
    id: 5,
    cardTitle: "Personal inside",
    cardDescription:
      "Personal insights, stories, and thoughts from the weather world.",
    cardShortDescription: "Just personal opinion",
    firtAnotherCard:
      "New Weather Sensors: Data straight from the heart of the storm.",
    secondAnotherCard:
      "Tomorrow's Weather: What my experience and intuition tell me.",
    bigImagesrc: "/snowy.jpg",
    smallImageSrcOne: "/web_things.webp",
    smallImageSrcTwo: "/tommorw.jpg",
  },
  {
    id: 6,
    cardTitle: "Users Articles",
    cardDescription:
      "Community-driven content: reviews, opinions, and trends by real users.",
    cardShortDescription: "Users can write? Yeah!",
    firtAnotherCard: "5 Myths About Weather: Debunking Popular Misconceptions.",
    secondAnotherCard: "MEX: The Best App? Discussing functionality and bugs.",
    bigImagesrc: "/weather_234.webp",
    smallImageSrcOne: "/webik.jpg",
    smallImageSrcTwo: "/snow1223.jpg",
  },
];
