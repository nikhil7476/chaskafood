import moment from "moment";

export function formatDate(date, format) {
  if (format) {
    const formattedDate = moment(date).format(format);
    return formattedDate;
  } else {
    console.log("date", date);
    const formattedDate = moment(date).format("MMM Do YYYY");
    console.log("formattedDate", formattedDate);
    return formattedDate;
  }
}
