import padTime from "../../helpers/padTime";

// e.g. 90 to "01:30"
const formatMinutesToString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;

    return `${padTime(hours)}:${padTime(min)}`;
};

// e.g. "01:30" to 90
const parseStringToMinutes = (string) => {
    const parts = string.split(":");
    const hours = parseInt(parts[0]);
    const minutes = parts.length > 1 ? parseInt(parts[1]) : 0;
    return hours * 60 + minutes;
};

export { formatMinutesToString, parseStringToMinutes };
