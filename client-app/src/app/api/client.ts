import ClientApi from "./clientApi"
import config from "./config"

const { rootAddress } = config
const axios = new ClientApi()

type Body = {
  status: boolean,
  data: any[],
  message: string
}
export const postReport = async (body: Body) => await axios.http.post(rootAddress + '/client/report', body)

export const postFeedback = async (body: Body) => await axios.http.post(rootAddress + '/client/feedback', body)