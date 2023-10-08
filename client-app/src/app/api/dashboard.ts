import ClientApi from "./clientApi"
import config from "./config"

const { rootAddress } = config
const axios = new ClientApi()

export const getIspMetrics = async () => await axios.http.get(rootAddress + '/dashboard/isp-metrics/tehran')

export const getMyIspMetrics = async (myIsp: string) => await axios.http.get(rootAddress + '/dashboard/my-isp/' + myIsp)