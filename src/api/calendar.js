import dataGovAPI from "./data-gov";
import { DATA_GOV_RU_API_KEY, DATA_GOV_RU_CALENDAR_DATASET } from "./CONSTANTS";

const defaultData = [
  {
    "Год/Месяц": "2022",
    Январь: "1,2,3,4,5,6,7,8,9,15,16,22,23,29,30",
    Февраль: "5,6,12,13,19,20,22*,23,26,27",
    Март: "5,6,7*,8,12,13,19,20,26,27",
    Апрель: "2,3,9,10,16,17,23,24,30",
    Май: "1,2+,7,8,9,14,15,21,22,28,29",
    Июнь: "4,5,11,12,13+,18,19,25,26",
    Июль: "2,3,9,10,16,17,23,24,30,31",
    Август: "6,7,13,14,20,21,27,28",
    Сентябрь: "3,4,10,11,17,18,24,25",
    Октябрь: "1,2,8,9,15,16,22,23,29,30",
    Ноябрь: "3*,4,5,6,12,13,19,20,26,27",
    Декабрь: "3,4,10,11,17,18,24,25,31",
    "Всего рабочих дней": "249",
    "Всего праздничных и выходных дней": "116",
    "Количество рабочих часов при 40-часовой рабочей неделе": "1989",
    "Количество рабочих часов при 36-часовой рабочей неделе": "1789.8",
    "Количество рабочих часов при 24-часовой рабочей неделе": "1192.2",
  },
];

const getCalendar = async (year) => {
  if (process.env.NODE_ENV === "development") return defaultData;
  const { modified } = await dataGovAPI.get(`/${DATA_GOV_RU_CALENDAR_DATASET}?access_token=${DATA_GOV_RU_API_KEY}`);
  const data = await dataGovAPI.get(
    `/${DATA_GOV_RU_CALENDAR_DATASET}/version/${modified}/content?search=${year}&access_token=${DATA_GOV_RU_API_KEY}`
  );
  if (!data) return [];
  return data;
};

export { getCalendar };
