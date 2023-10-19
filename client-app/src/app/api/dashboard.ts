import ClientApi from "./clientApi";
import config from "./config";

const { rootAddress } = config;
const axios = new ClientApi();

// Getting Metrics Information information
export const getIspMetrics = async () =>
  await axios.http.get(rootAddress + "/dashboard/isp-metrics");

export const getMyIspMetrics = async (myIsp: string) =>
  await axios.http.get(rootAddress + "/dashboard/my-isp/" + myIsp);


// Getting Chart information
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

// Getting Issues states
export const getGlobalStates = async () =>
  await axios.http.get(rootAddress + '/dashboard/get-issue-stats/stats')

export const getIssues = async () =>
  await axios.http.get(rootAddress + '/dashboard/get-issue-stats/issues')

export const getIssuesForCities = async () =>
  await axios.http.get(rootAddress + '/dashboard/get-issue-stats/cities')

export const getIssuesForIsp = async () =>
  await axios.http.get(rootAddress + '/dashboard/get-issue-stats/isp')


// Getting the states of internet
export const getInternetStateForNow = async () =>
  await axios.http.get(rootAddress + '/dashboard/stats/now')