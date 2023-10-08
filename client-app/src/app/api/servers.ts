import ClientApi from "./clientApi"
import config from "./config"
import { ResponseType } from "./types"

const { rootAddress } = config
const axios = new ClientApi()


type Server = { id: string, location: string, name: string, url: string }
export const getServers = async (): Promise<ResponseType<Server[]>> => await axios.http.get(rootAddress + '/servers')