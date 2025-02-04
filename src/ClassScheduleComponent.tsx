import React from "react";
import {
  ClassSchedule,
  dimaCurrentClassSchedule,
  vasjaCurrentClassSchedule,
} from "./ClassSchedules";
import { endOfSchoolDay, Shift } from "./ClassScheduleUtils";
import { getCurrentDay } from "./Workday";
import { dima, Human, vasja } from "./Human";
import { Classes } from "./Classes";

function getSchedule(child: Human): ClassSchedule | null {
  switch (child) {
    case vasja:
      return vasjaCurrentClassSchedule;
    case dima:
      return dimaCurrentClassSchedule;
  }
  return null;
}

const ClassScheduleComponent = () => {
  const [child, setChild] = React.useState<Human>(vasja);
  const [shortenedClasses, setShortenedClasses] = React.useState(false);
  const [morningShift, setMorningShift] = React.useState(false);
  const [schoolDayEndTime, setSchoolDayEndTime] = React.useState("");
  const [show, setShow] = React.useState(true);

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.value;
    switch (name) {
      case vasja.name:
        setChild(vasja);
        break;
      case dima.name:
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

  const animateTimeChange = (time: string) => {
    setShow(false); // Start fade-out

    setTimeout(() => {
      setSchoolDayEndTime(time);
      setShow(true);
    }, 300);
  };

  React.useEffect(() => {
    const schedule = getSchedule(child);
    if (schedule === null) {
      alert("No schedule found for this child.");
      return;
    }

    const currentDay = getCurrentDay();
    if (currentDay === null) {
      alert("Today is Saturday or Sunday — no school today.");
      return;
    }

    const currentShift = morningShift ? Shift.Morning : Shift.Afternoon;

    const endTime = endOfSchoolDay(
      currentDay,
      schedule,
      currentShift,
      shortenedClasses
    );

    animateTimeChange(endTime);
  }, [child, shortenedClasses, morningShift]);

  return (
    <div
      className="
        flex flex-row justify-center items-start gap-4 
      "
    >
      <div className="p-4 bg-white rounded-xl shadow-md">
        <h1 className="text-xl font-bold">Class Schedule</h1>
        <div className="space-y-2">
          <label className="block">
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={handleNameChange}
            >
              <option value={vasja.name}>{vasja.nickname}</option>
              <option value={dima.name}>{dima.nickname}</option>
            </select>
          </label>
          <label className="block">
            <input
              type="checkbox"
              className="mr-2"
              checked={shortenedClasses}
              onChange={handleCheckboxChange}
            />
            Shortened Classes
          </label>
          <label className="block">
            <input
              type="checkbox"
              className="mr-2 !important"
              checked={morningShift}
              onChange={handleMorningShiftChange}
            />
            Morning Shift
          </label>
        </div>
      </div>
      <div className="p-4 bg-white rounded-xl shadow-md">
        {schoolDayEndTime && (
          <p className="text-2xl font-bold text-gray-700">
            <div className="text-gray-700">End of school day</div>
            <div className={`text-red-600/75 transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>{schoolDayEndTime}</div>
          </p>
        )}
        <div className="p-4">
          <p className="text-xl font-bold">Today's Schedule</p>
          <ul>
            {child &&
              getSchedule(child) &&
              getCurrentDay() &&
              getSchedule(child)![getCurrentDay()!].map((subject: Classes, index) => (
                <li key={index}>{subject}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassScheduleComponent;
