import http from './config'

const domain = '/api/order'

export const getOrder = (params) => {
    return http.get(`${domain}`, {params})
}

export const createOrder = (data) => {
    return http.post(`${domain}`, {data})
}

export const updateOrder = ({id, data}) => {
    console.log(id, data)
    return http.post(`${domain}?id=${id}`, {data})
}