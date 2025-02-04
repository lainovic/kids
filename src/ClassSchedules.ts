import { DimaClasses, VasjaClasses } from "./Classes";
import { Workday } from "./Workday";

type VasjaClassSchedule = {
  [Workday.Monday]: VasjaClasses[];
  [Workday.Tuesday]: VasjaClasses[];
  [Workday.Wednesday]: VasjaClasses[];
  [Workday.Thursday]: VasjaClasses[];
  [Workday.Friday]: VasjaClasses[];
};

type DimaClassSchedule = {
  [Workday.Monday]: DimaClasses[];
  [Workday.Tuesday]: DimaClasses[];
  [Workday.Wednesday]: DimaClasses[];
  [Workday.Thursday]: DimaClasses[];
  [Workday.Friday]: DimaClasses[];
};

export type ClassSchedule = VasjaClassSchedule | DimaClassSchedule;

export const vasjaCurrentClassSchedule: VasjaClassSchedule = {
  Monday: [
    VasjaClasses.Serbian,
    VasjaClasses.Math,
    VasjaClasses.TheWorldAroundUs,
    VasjaClasses.English,
  ],
  Tuesday: [
    VasjaClasses.Math,
    VasjaClasses.Serbian,
    VasjaClasses.PhysicalEducation,
    VasjaClasses.CivilReligiousEducation,
  ],
  Wednesday: [
    VasjaClasses.Math,
    VasjaClasses.Serbian,
    VasjaClasses.TheWorldAroundUs,
    VasjaClasses.DigitalEducation,
    VasjaClasses.PhysicalEducation,
  ],
  Thursday: [
    VasjaClasses.English,
    VasjaClasses.Serbian,
    VasjaClasses.Math,
    VasjaClasses.PhysicalEducation,
  ],
  Friday: [
    VasjaClasses.Math,
    VasjaClasses.Serbian,
    VasjaClasses.Art,
    VasjaClasses.Art,
    VasjaClasses.Music,
  ],
};

export const dimaCurrentClassSchedule: DimaClassSchedule = {
  Monday: [
    DimaClasses.Serbian,
    DimaClasses.Math,
    DimaClasses.Art,
    DimaClasses.Art,
  ],
  Tuesday: [
    DimaClasses.Math,
    DimaClasses.Serbian,
    DimaClasses.NatureAndSociety,
    DimaClasses.PhysicalEducation,
    DimaClasses.English,
  ],
  Wednesday: [
    DimaClasses.Serbian,
    DimaClasses.Math,
    DimaClasses.Music,
    DimaClasses.PhysicalEducation,
  ],
  Thursday: [
    DimaClasses.DigitalEducation,
    DimaClasses.Math,
    DimaClasses.Serbian,
    DimaClasses.NatureAndSociety,
    DimaClasses.PhysicalEducation,
  ],
  Friday: [
    DimaClasses.English,
    DimaClasses.CivilReligiousEducation,
    DimaClasses.Serbian,
    DimaClasses.Math,
  ],
};
