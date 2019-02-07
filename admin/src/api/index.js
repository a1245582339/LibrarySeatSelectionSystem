import axios from 'axios';
const http = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// request拦截器
http.interceptors.request.use(
  config => config,
  error => error,
);

// response拦截器
http.interceptors.response.use(
  response => response,
  (error) => {
    console.log(error)
    return error
  },
);


export default http;