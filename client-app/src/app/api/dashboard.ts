import ClientApi from "./clientApi";
import config from "./config";

const { rootAddress } = config;
const axios = new ClientApi();

export const getIspMetrics = async () =>
  await axios.http.get(rootAddress + "/dashboard/isp-metrics/tehran");

export const getMyIspMetrics = async (myIsp: string) =>
  await axios.http.get(rootAddress + "/dashboard/my-isp/" + myIsp);

export const TodayCharts = async () =>
  await axios.http.get(rootAddress + "/dashboard/charts/today");

export const WeekCharts = async () =>
  await axios.http.get(
    rootAddress + "/dashboard/charts/weekly/irancell/Tehran"
  );
export const MonthCharts = async () =>
  await axios.http.get(rootAddress + "/dashboard/charts/month/irancell/Tehran");

export const YearCharts = async () =>
  await axios.http.get(rootAddress + "/dashboard/charts/year/irancell/Tehran");
