import { ClassSchedule } from "./ClassSchedules";
import { Workday } from "./Workday";

export enum Shift {
  Morning,
  Afternoon,
}

function startOfSchoolDay(shift: Shift): string {
  switch (shift) {
    case Shift.Morning:
      return "08:00";
    case Shift.Afternoon:
      return "13:30";
  }
}

function endOfSchoolDay(
  day: Workday,
  classSchedule: ClassSchedule,
  shift: Shift,
  shortenedClasses: boolean = false
): string {
  let totalDurationInMinutes = calculateTotalDurationInMinutes(
    classSchedule,
    day,
    shortenedClasses
  );

  return calculateEndTime(startOfSchoolDay(shift), totalDurationInMinutes);
}

function calculateTotalDurationInMinutes(
  classSchedule: ClassSchedule,
  day: Workday,
  shortenedClasses: boolean
): number {
  let totalDurationInMinutes = 0;
  classSchedule[day].forEach((_, index) => {
    // 30 minutes for shortened classes, 45 minutes otherwise.
    totalDurationInMinutes += shortenedClasses ? 30 : 45;
    // 20 minutes for lunch break, 5 minutes otherwise.
    totalDurationInMinutes += index == 1 ? 20 : 5;
  });
  totalDurationInMinutes -= 5;
  return totalDurationInMinutes;
}

function calculateEndTime(
  startTime: string,
  totalDurationInMinutes: number
): string {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  let endHours = Math.floor(totalDurationInMinutes / 60) + startHours;
  let endMinutes = (totalDurationInMinutes % 60) + startMinutes;
  if (endMinutes >= 60) {
    endMinutes -= 60;
    endHours += 1;
  }

  return `${endHours}:${endMinutes.toString().padStart(2, "0")}`;
}

export { startOfSchoolDay, endOfSchoolDay };
