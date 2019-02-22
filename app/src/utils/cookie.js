import Cookies from 'js-cookie'

export const setToken = (token) => {
    Cookies.set('Authorization', token, { expires: 7 });
}

export const getToken = () => {
    return decodeURI(Cookies.get('Authorization'))
}

export const delToken = () => {
    Cookies.remove('Authorization');
}