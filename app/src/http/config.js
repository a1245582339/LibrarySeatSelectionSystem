import axios from 'axios'
// import { getToken } from '@/utiles/js-cookie';

const http = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000
})

// const whiteList = ['/login']s

// request拦截器
http.interceptors.request.use(
    config => {
        // if (getToken() && getToken() !== 'undefined') {
        //     config.headers.Authorization = getToken()
        // } else if (whiteList.indexOf(window.location.pathname) === -1) {
        //     message.warning('登录信息失效！请重新登录')
        //     window.location = '/login'
        // }
        return config
    },
    error => {
        return error
    }
)

// respone拦截器
http.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return error
    }
)

export default http