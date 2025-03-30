export const now = new Date();

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-EN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const getDayOfWeek = (date: Date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
};

export const getDayFormatted = (date: Date) => {
  const day = date.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  return `${day} ${month}`;
};
