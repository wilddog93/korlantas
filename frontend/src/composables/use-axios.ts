import AxiosInstance, { type AxiosRequestConfig } from 'axios'
import { useAuth } from '@/stores/auth';

export default function useAxios() {
  const axios = AxiosInstance.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL || 'https://dummyjson.com/'
  })
  
  const auth = useAuth()

  axios.interceptors.request.use((config) => {
    const token = auth.state.token;
    // Check if token exist and Authorization headers not set.
    if (token && !config.headers.Authorization) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
     
    return config;
});

  axios.interceptors.response.use((response) => response, async function(error) {
    const config = error.config;
    if (
      error.response?.status === 401 &&
      !config._retry &&
      config.url != '/auth/refresh' &&
      config.url != '/auth/login' &&
      auth.state.refreshToken
    ) {
      // Request refresh token.
      const token = await auth.refreshAccessToken();        
      // Set Authorization header for retry request.
      config.headers['Authorization']  = 'Bearer ' + token;

      // Set token state to newest token
      auth.setToken(token);

      return axios(config);
    }
    return Promise.reject(error);
  })

  const $post = async (url: string, body:any, config?: AxiosRequestConfig<any>) => {
    return (await axios.post(url, body, { ...config }))?.data
  }

  const $get = async (url: string, config?: AxiosRequestConfig<any>) => {
    return (await axios.get(url, { ...config }))?.data
  }

  const $put = async (url: string, body:any, config?: AxiosRequestConfig<any>) => {
    return (await axios.put(url, body, { ...config }))?.data
  }

  const $path = async (url: string, config?: AxiosRequestConfig<any>) => {
    return (await axios.patch(url, { ...config }))?.data
  }

  const $delete = async (url: string, config?: AxiosRequestConfig<any>) => {
    return (await axios.delete(url, { ...config }))?.data
  }

  return { axios, $post, $get, $path, $put, $delete }
}