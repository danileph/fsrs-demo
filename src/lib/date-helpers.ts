import dayjs from "dayjs";

const DATE_FORMAT = "DD.MM.YYYY";

// Function to convert Date to "dd.mm.yyyy, hh:mm:ss" format using Day.js
export const formatDateToString = (date: Date): string => {
    return dayjs(date).format(DATE_FORMAT);
}

// Function to convert string in "dd.mm.yyyy, hh:mm:ss" format to Date using Day.js
export const parseStringToDate = (dateString: string): Date => {
    return dayjs(dateString, DATE_FORMAT).toDate();
}