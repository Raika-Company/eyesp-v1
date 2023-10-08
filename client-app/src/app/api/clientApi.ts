import axios, { AxiosInstance } from "axios";
import config from "./config";
import storage from "./storage";

export default class ClientApi {
  http: AxiosInstance

  constructor() {
    this.http = axios.create({
      baseURL: config.rootAddress,
      timeout: config.timeout
    })

    // this.http.interceptors.request.use(async (request) => {
    //   if (request && request.headers) {
    //     const token = storage.get(config.tokenName)
    //     token && (request.headers.Authorization = `Bearer ${storage.get(config.tokenName)}`)
    //   }

    //   return request
    // })

    // this.http.interceptors.response.use((response) => {
    //   if (response.data.result) {
    //     const { access_token, refresh_token } = response.data.result

    //     access_token && storage.set(config.tokenName, access_token)
    //     refresh_token && storage.set(config.refreshTokenName, refresh_token)
    //   }

    //   return response.data
    // }), async (error) => {
    //   const status = error.response ? error.response.status : null
    //   const originalRequest = error.config

    //   if (originalRequest.url !== '/v1/login' && error.response) {

    //     if (status === 401 && !originalRequest._retry) {
    //       originalRequest._retry = true;

    //       try {
    //         const response = await this.http.post(config.rootAddress + '/v1/jwt/refresh', {
    //           refresh: storage.get(config.refreshTokenName)
    //         })

    //         const { access } = response.data.result
    //         access && storage.set(config.tokenName, access)

    //         return this.http(originalRequest)
    //       } catch (_error) {
    //         return Promise.reject(_error)
    //       }
    //     }
    //   }
    //   return Promise.reject(error)
    // }
  }


}