import ClientApi from "./clientApi"
import config from "./config"
import storage from "./storage"
import { v4 as Idv4 } from 'uuid'

const { rootAddress } = config
const axios = new ClientApi()

export const getPing = async () => {
  const uid = Idv4()
  let cid = storage.get(config.cid)
  if (!cid) {
    const newId = Idv4()
    storage.set(config.cid, newId)
    cid = newId
  }

  return await axios.http.get(rootAddress + `/ping?cid=${cid}&uid=${uid}`)
}


