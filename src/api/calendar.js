import repository from "./repository";

const getCalendar = async (year) => {
  const { data } = await repository.get(`getYearData?year=${year}`);
  return data || null;
};

export { getCalendar };
