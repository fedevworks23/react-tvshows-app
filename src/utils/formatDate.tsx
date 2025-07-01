const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
const dd = String(today.getDate()).padStart(2, "0");

export const formattedDate = `${yyyy}-${mm}-${dd}`;

export const currentDate = new Date().toISOString().split('T')[0];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const currentDay = days[today.getDay()];