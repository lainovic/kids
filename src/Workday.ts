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

  export function isSchoolDay(day: string): boolean {
    return toWorkDay(day) !== null;
  }

  export function toWorkDay(day: string): Workday | null {
    switch (day) {
      case "Monday":
        return Workday.Monday;
      case "Tuesday":
        return Workday.Tuesday;
      case "Wednesday":
        return Workday.Wednesday;
      case "Thursday":
        return Workday.Thursday;
      case "Friday":
        return Workday.Friday;
      default:
        return null;
    }
  }