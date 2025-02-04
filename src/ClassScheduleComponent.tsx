import React from "react";
import {
  ClassSchedule,
  dimaCurrentClassSchedule,
  vasjaCurrentClassSchedule,
} from "./ClassSchedules";
import { endOfSchoolDay, Shift } from "./ClassScheduleUtils";
import { getCurrentDay } from "./Workday";
import { dima, Human, vasja } from "./Human";

const ClassScheduleComponent = () => {
  const [child, setChild] = React.useState<Human>(vasja);
  const [shortenedClasses, setShortenedClasses] = React.useState(false);
  const [morningShift, setMorningShift] = React.useState(false);
  const [schoolDayEndTime, setSchoolDayEndTime] = React.useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.value;
    switch (name) {
      case "Vasja":
        setChild(vasja);
        break;
      case "Dima":
        setChild(dima);
        break;
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShortenedClasses(event.target.checked);
  };

  const handleMorningShiftChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMorningShift(event.target.checked);
  };

  React.useEffect(() => {
    const schedule = getSchedule(child);
    if (schedule === null) {
      alert("No schedule found for this child");
      return;
    }

    const currentDay = getCurrentDay();
    if (currentDay === null) {
      alert("Today is Saturday or Sunday");
      return;
    }

    const currentShift = morningShift ? Shift.Morning : Shift.Afternoon;

    const endTime = endOfSchoolDay(
      currentDay,
      schedule,
      currentShift,
      shortenedClasses
    );

    setSchoolDayEndTime(endTime);
  }, [child, shortenedClasses, morningShift]);

  return (
    <div>
      <h1>Children Classes</h1>
      <select onChange={handleNameChange}>
        <option value="Vasja">Vasja</option>
        <option value="Dima">Dima</option>
      </select>
      <div>
        <label>
          <input
            type="checkbox"
            checked={shortenedClasses}
            onChange={handleCheckboxChange}
          />
          Shortened Classes
        </label>
        <label>
          <input
            type="checkbox"
            checked={morningShift}
            onChange={handleMorningShiftChange}
          />
          Morning shift
        </label>
      </div>
      {schoolDayEndTime && <p>End of school day: {schoolDayEndTime}</p>}
    </div>
  );
};
export default ClassScheduleComponent;

function getSchedule(child: Human): ClassSchedule | null {
  switch (child) {
    case vasja:
      return vasjaCurrentClassSchedule;
    case dima:
      return dimaCurrentClassSchedule;
  }
  return null;
}
