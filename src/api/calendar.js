import dataGovAPI from "./data-gov";

const getCalendar = async (year, month) => {
  const { request } = await dataGovAPI.get(`getdata?year=${year}&month=${month}`)
  const { response } = await request;
  if (!response) return {};
  return response;
};

export { getCalendar };
