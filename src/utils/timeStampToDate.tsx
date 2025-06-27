const timestamp = 1747942783; // Unix timestamp in seconds
const date = new Date(timestamp * 1000); // Convert to milliseconds

export const timestampToDate = (timestamp: number) => {
    return new Date(timestamp * 1000);
}

// console.log(date.toString()); // Full date and time in local timezone
// console.log(date.toUTCString()); // In UTC
// console.log(date.toLocaleDateString());
// console.log(date.toLocaleTimeString());
