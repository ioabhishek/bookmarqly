import { BASE_URL } from "@/utils/Endpoints"
import axios from "axios"
import Cookies from "js-cookie"

const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

axiosPublic.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken")
    if (accessToken) {
      config.headers.Authorization = accessToken
    }
    return config
  },
  (err) => {
    Promise.reject(err)
  }
)

// axiosPublic.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken")
//     if (accessToken) {
//       config.headers.Authorization = accessToken
//     }
//     return config
//   },
//   (err) => {
//     Promise.reject(err)
//   }
// )

// axiosPublic.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true

//       try {
//         const refreshToken = localStorage.getItem("refreshToken")

//         const response = await axiosPublic.post(`${BASE_URL}${REFRESH_TOKEN}`, {
//           refreshToken,
//         })

//         const accessToken = response?.data?.data?.accessToken
//         const newRefreshToken = response?.data?.data?.refreshToken
//         localStorage.setItem("accessToken", accessToken)
//         localStorage.setItem("refreshToken", newRefreshToken)

//         originalRequest.headers.Authorization = accessToken

//         return axios(originalRequest)
//       } catch (error) {}
//     }
//     return Promise.reject(error)
//   }
// )

export default axiosPublic
