import { format } from "date-fns";

export const stripTags = str => str.replace(/(<([^>]+)>)/gi, "");

export const formatDate = (start, end) =>
  `${format(start, "DD.MM.YYYY HH:mm")}${
    end ? " - " + format(end, "DD.MM.YYYY HH:mm") : ""
  }`;

export const formatOpeningHours = hours =>
  hours
    .map(({ weekday_id, opens, closes, open24h }) => {
      const weekdays = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];
      const hours =
        opens && closes
          ? `${opens.slice(0, opens.length - 3)} - ${closes.slice(
              0,
              closes.length - 3
            )}`
          : "closed";
      return open24h
        ? "Open 24 hours"
        : `${weekdays[weekday_id - 1]}: ${hours}`;
    })
    .join(", ");

export const joinAndFilterEmpty = (...params) =>
  params.filter(param => param).join(", ");

export const getTagColor = tag => {
  const colors = [
    "#000000",
    "#f34336",
    "#e81e63",
    "#9b27af",
    "#673ab7",
    "#3f51b4",
    "#4cae50",
    "#fe9700",
    "#2195f2",
    "#8ac24a",
    "#fe5722",
    "#03a8f3",
    "#ccdb39",
    "#00bbd3",
    "#feea3b",
    "#9d9d9d",
    "#fec007",
    "#607c8a",
    "#9d9d9d",
    "#785548"
  ];
  return colors[tag.length] || "#fe5722";
};
