import axios from 'axios';
import { getToken } from '../utils/auth'
import message from 'iview/src/components/message'
const http = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const whiteList = ['/login']

// request拦截器
http.interceptors.request.use(
  config => {
    if (getToken() && getToken() !== 'undefined') {
        config.headers.Authorization = getToken()
    } else if (whiteList.indexOf(window.location.pathname) === -1) {
        // message.warning('登录信息失效！请重新登录')
        window.location = '/#/login'
    }
    return config
  },
  error => error,
);

// response拦截器
http.interceptors.response.use(
  response => response,
  (error) => {
    console.log(error)
    throw error
  },
);


export default http;