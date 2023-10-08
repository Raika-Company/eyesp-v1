import ClientApi from "./clientApi"
import config from "./config"
import { ResponseType } from "./types"

const { rootAddress } = config
const axios = new ClientApi()

export const getClientIpAddress = async (): Promise<ResponseType<{ ip: string }>> => await axios.http.get(rootAddress + '/get-ip')

export const postIpInformation = async (body: { status: boolean, message: 'string' }) => await axios.http.post(rootAddress + '/set-ip-info', body)