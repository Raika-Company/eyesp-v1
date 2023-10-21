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
export const TodayCharts = async (province = 'Tehran', isp = 'irancell') =>
  await axios.http.get(rootAddress + `/dashboard/charts/today/${isp}/${province}`);

export const WeekCharts = async (province = 'Tehran', isp = 'irancell') =>
  await axios.http.get(
    rootAddress + `/dashboard/charts/weekly/${isp}/${province}`
  );
export const MonthCharts = async (province = 'Tehran', isp = 'irancell') =>
  await axios.http.get(rootAddress + `/dashboard/charts/month/${isp}/${province}`);

export const YearCharts = async (province = 'Tehran', isp = 'irancell') =>
  await axios.http.get(rootAddress + `/dashboard/charts/year/${isp}/${province}`);

// Getting Issues states
export const getGlobalStates = async () =>
  await axios.http.get(rootAddress + "/dashboard/get-issue-stats/stats");

export const getIssues = async () =>
  await axios.http.get(rootAddress + "/dashboard/get-issue-stats/issues");

// export const getIssuesForCities = async () =>
//   await axios.http.get(rootAddress + '/dashboard/get-issue-stats/cities')


export const getIssuesForIsp = async () =>
  await axios.http.get(rootAddress + "/dashboard/get-issue-stats/isp");

// Getting the states of internet
export const getInternetState = async (time) =>
  await axios.http.get(rootAddress + '/dashboard/stats/' + time)

// Getting information for city
export const getCityMetrics = async (city) =>
  await axios.http.get(rootAddress + '/dashboard/city-metrics/' + city)

