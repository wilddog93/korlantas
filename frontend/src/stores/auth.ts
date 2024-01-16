import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useCookies } from "vue3-cookies";
import useAxios from '@/composables/use-axios';
import type { RouteLocationNormalized } from 'vue-router';

export const useAuth = defineStore('auth', () => {
  const { cookies } = useCookies();

  const axios = useAxios()
  const token = ref<string>('')
  const refreshToken = ref<string>('')
  const user = ref<any>(null)
  const isAuth = ref(false)
  const firstLoaded = ref(false)
  const redirectedFrom = ref<RouteLocationNormalized | undefined | null>(null)

  const state = reactive({
    token,
    refreshToken,
    user,
    isAuth,
    firstLoaded,
    redirectedFrom,
  })

  const login = async (credential:any): Promise<any> => {
    const data = await axios.$post('/auth/login', credential)
    const { access_token, refresh_token } = data.token

    setToken(access_token)
    setRefreshToken(refresh_token)
    setAuth(true)
    await fetchMe()

    return data;
  }

  const refreshAccessToken = async (): Promise<string> => {
    const { token } = await axios.$post('/auth/refresh', {}, {
      headers: {
        'Authorization': 'Bearer ' + refreshToken.value
      }
    })

    return token.access_token
  }

  const fetchMe = async ():Promise<any> => {
    const data = await axios.$get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    setAuth(true)
    setUser(data)
  }

  const $reset = () => {
    setToken("")
    setRefreshToken("")
    setAuth(false)
    cookies.set('auth.token', "");
    cookies.set('auth.refresh_token', "")
  }

  const logout = async (): Promise<void> => {
    await axios.$post('auth/logout', {})
    cookies.set('auth.token', "");
    cookies.set('auth.refresh_token', "")
    setToken("")
    setRefreshToken("")
  }

  const setToken = (value:string) => {
    cookies.set('auth.token', value);
    token.value = value
  }

  const setUser = (value:any) => {
    user.value = value
  }

  const setRefreshToken = (value:string) => {
    cookies.set('auth.refresh_token', value)
    refreshToken.value = value
  }

  const setAuth = (value:boolean) => {
    isAuth.value = value
  }

  const setTokenFromStorage = () => {
    const token = cookies.get('auth.token')
    const refreshToken =  cookies.get('auth.refresh_token')
    
    if (token) {
      setToken(token)
      setRefreshToken(refreshToken)
    }
  }

  const setRedirectedFrom = (value:RouteLocationNormalized | null) => {
    redirectedFrom.value = value
  }

  const setLoaded = (value: boolean = true) => {
    firstLoaded.value = value;
  }

  return {
    login,
    refreshAccessToken,
    setToken,
    setRefreshToken,
    setTokenFromStorage,
    setAuth,
    fetchMe,
    logout,
    $reset,
    setLoaded,
    setRedirectedFrom,
    firstLoaded,
    state,
  }
})