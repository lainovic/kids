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

interface ClassScheduleComponentProps {
  setTime: (value: string) => void;
}
const ClassScheduleComponent: React.FC<ClassScheduleComponentProps> = ({
  setTime,
}) => {
  const [child, setChild] = React.useState<Human>(vasja);
  const [shortenedClasses, setShortenedClasses] = React.useState(false);
  const [morningShift, setMorningShift] = React.useState(false);
  const [schoolDayStartTime, setSchoolDayStartTime] = React.useState("");
  const [schoolDayEndTime, setSchoolDayEndTime] = React.useState("");
  const [show, setShow] = React.useState(true);
  const [preClass, setPreClass] = React.useState(false);

  const startOfSchoolDay = (shift: Shift): string => {
    switch (shift) {
      case Shift.Morning:
        return "08:00";
      case Shift.Afternoon:
        if (preClass) {
          return "12:45";
        } else {
          return "13:30";
        }
    }
  };

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

  const handlePreClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreClass(event.target.checked);
  };

  const animateChange = (value: string, block: (value: string) => void) => {
    setShow(false); // Start fade-out

    setTimeout(() => {
      block(value);
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

    const startTime = startOfSchoolDay(currentShift);

    const endTime = endOfSchoolDay(
      startTime,
      currentDay,
      schedule,
      shortenedClasses
    );

    setTime(endTime);
    animateChange(startTime, setSchoolDayStartTime);
    animateChange(endTime, setSchoolDayEndTime);
  }, [child, shortenedClasses, morningShift, preClass]);

  return (
    <div
      className="
        flex flex-row justify-center items-start gap-4 
      "
    >
      <div className="flex flex-row items-center gap-4 p-5 bg-gray-100 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
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
                className="mr-2 !important"
                checked={preClass}
                onChange={handlePreClassChange}
              />
              Pre-class
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
          {schoolDayStartTime && (
            <p className="text-2xl font-bold text-gray-700">
              <div className="text-gray-700">Start of school day</div>
              <div
                className={`text-red-600/75 transition-opacity duration-500 ${
                  show ? "opacity-100" : "opacity-0"
                }`}
              >
                {schoolDayStartTime}
              </div>
            </p>
          )}
          {schoolDayEndTime && (
            <p className="text-2xl font-bold text-gray-700">
              <div className="text-gray-700">End of school day</div>
              <div
                className={`text-red-600/75 transition-opacity duration-500 ${
                  show ? "opacity-100" : "opacity-0"
                }`}
              >
                {schoolDayEndTime}
              </div>
            </p>
          )}
          <div className="p-4">
            <p className="text-xl font-bold mb-2">Today's Schedule</p>
            <ul className="list-item list-inside">
              {child &&
                getSchedule(child) &&
                getCurrentDay() &&
                getSchedule(child)![getCurrentDay()!].map(
                  (subject: Classes, index) => (
                    <li
                      key={index}
                      className="text-pretty text-lg text-gray-700 py-1 px-2 bg-white rounded shadow-sm mb-2"
                    >
                      {subject}
                    </li>
                  )
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassScheduleComponent;
