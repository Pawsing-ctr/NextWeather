export const getLocalizedFooterCategories = (language: string) => {
  if (language === "ru") {
    return [
      {
        links: [
          { name: "Главная", url: "/" },
          { name: "Путешествия", url: "/" },
        ],
      },
      {
        links: [
          { name: "Новости", url: "/" },
          { name: "Земля", url: "/" },
        ],
      },
      {
        links: [
          { name: "Спорт", url: "/" },
          { name: "Видео", url: "/" },
        ],
      },
      {
        links: [
          { name: "Бизнес", url: "/" },
          { name: "Прямой эфир", url: "/" },
        ],
      },
      {
        links: [{ name: "Инновации", url: "/" }],
      },
      {
        links: [{ name: "Культура", url: "/" }],
      },
    ];
  }

  return [
    {
      links: [
        { name: "Home", url: "/" },
        { name: "Travel", url: "/" },
      ],
    },
    {
      links: [
        { name: "News", url: "/" },
        { name: "Earth", url: "/" },
      ],
    },
    {
      links: [
        { name: "Sport", url: "/" },
        { name: "Video", url: "/" },
      ],
    },
    {
      links: [
        { name: "Business", url: "/" },
        { name: "Live", url: "/" },
      ],
    },
    {
      links: [{ name: "Innovation", url: "/" }],
    },
    {
      links: [{ name: "Culture", url: "/" }],
    },
  ];
};

export const getLocalizedBottomLinks = (language: string) => {
  if (language === "ru") {
    return [
      "Условия использования",
      "О MEX",
      "Политика конфиденциальности",
      "Файлы cookie",
      "Помощь по доступности",
      "Родительский контроль",
      "Связаться с MEX",
      "Рассылки MEX",
      "Реклама с нами",
      "Не передавать и не продавать мои данные",
    ];
  }

  return [
    "Terms of Use",
    "About the MEX",
    "Privacy Policy",
    "Cookies",
    "Accessibility Help",
    "Parental Guidance",
    "Contact the MEX",
    "MEX emails for you",
    "Advertise with us",
    "Do not share or sell my info",
  ];
};
