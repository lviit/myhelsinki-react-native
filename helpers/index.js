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
