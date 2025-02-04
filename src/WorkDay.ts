export enum Workday {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
}

export function getCurrentDay(): Workday | null {
  // if today is Saturday or Sunday, return null
  const days = [
    null,
    Workday.Monday,
    Workday.Tuesday,
    Workday.Wednesday,
    Workday.Thursday,
    Workday.Friday,
    null,
  ];

  const today = new Date().getDay();
  return days[today];
}
