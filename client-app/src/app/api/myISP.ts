import ClientApi from "./clientApi";
import config from "./config";

const { rootAddress } = config;
const axios = new ClientApi();

// Getting Metrics Information information

export const nowPercentage = async () =>
  await axios.http.get(rootAddress + "/dashboard/stats/now");

export const HoursAgoPercentage = async () =>
  await axios.http.get(rootAddress + "/dashboard/stats");

export const TodayPercentage = async () =>
  await axios.http.get(rootAddress + "/dashboard/stats/today");

export const YesterDayPercentage = async () =>
  await axios.http.get(rootAddress + "/dashboard/stats/yesterday");

export const WeekPercentage = async () =>
  await axios.http.get(rootAddress + "/dashboard/stats/week");
export const MonthPercentage = async () =>
  await axios.http.get(rootAddress + "/dashboard/stats/month");
export const YearPercentage = async () =>
  await axios.http.get(rootAddress + "/dashboard/stats/year");

export const Operators = async (name) =>
  await axios.http.get(rootAddress + "/dashboard/my-isp/" + name);
