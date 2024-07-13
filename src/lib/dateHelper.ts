import dayjs from "dayjs";
// export const formatDate = (date: Date): string => {
//     if (!(date instanceof Date) || isNaN(date.getTime())) {
//         console.error('formatDate: Invalid Date object');
//         return "Invalid Date";
//     }

//     const pad = (num: number): string => num.toString().padStart(2, '0');

//     const day = pad(date.getDate());
//     const month = pad(date.getMonth() + 1);
//     const year = date.getFullYear();
//     const hours = pad(date.getHours());
//     const minutes = pad(date.getMinutes());
//     const seconds = pad(date.getSeconds());

//     return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
// }

// export const parseDate = (dateString: string): Date => {
//     const dateRegex = /^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}:\d{2}$/;

//     if (typeof dateString !== 'string' || !dateRegex.test(dateString)) {
//         console.error('formatDate: Invalid date string format');
//         return new Date("Invalid date");
//     }

//     const [datePart, timePart] = dateString.split(', ');
//     const [day, month, year] = datePart.split('.').map(Number);
//     const [hours, minutes, seconds] = timePart.split(':').map(Number);

//     return new Date(year, month - 1, day, hours, minutes, seconds);
// }

// Function to convert Date to "dd.mm.yyyy, hh:mm:ss" format using Day.js
export const formatDateToString = (date: Date): string => {
    return dayjs(date).format('DD.MM.YYYY, HH:mm:ss');
}

// Function to convert string in "dd.mm.yyyy, hh:mm:ss" format to Date using Day.js
export const parseStringToDate = (dateString: string): Date => {
    return dayjs(dateString, 'DD.MM.YYYY, HH:mm:ss').toDate();
}