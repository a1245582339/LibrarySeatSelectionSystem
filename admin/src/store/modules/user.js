import { setToken, removeToken } from '@/utils/auth';
import { login, getUserInfo, updateUserInfo, checkPassword } from '@/api/user';
                            
const user = {
    state: {
        token: '',
    },

    mutations: {
        SET_USER: (state, user) => {
            Object.assign(state, user)
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        }
    },

    actions: {
        async LOGIN({ commit }, loginInfo) {
            // console.log(loginInfo)
            try {
                const res = await login(loginInfo);
                if (res.data.code == '20000') {
                    commit('SET_TOKEN', res.data.token);
                    setToken('bare ' + res.data.token);
                }
                return res
            } catch (err) {
                console.log(err);
            }
        },
        async LOG_OUT() {
            try {
                removeToken();
            } catch (err) {
                console.log(err);
            }
        },
        async GET_INFO({ commit, state }) {
            try {
                const res = await getUserInfo(state.token)
                if (res.data.code == '20000') {
                    commit('SET_USER', res.data.data)
                } else {
                    throw res.data.msg
                }
            } catch (err) {
                throw err
            }
        },
        async UPDATE_INFO({}, data) {
            try {
                const res = await updateUserInfo(data)
                if (res.data.code == '20000') {
                    return res.data.msg
                } else {
                    throw res.data.msg
                }
            } catch (err) {
                throw err
            }
        },
        async CHECK_PASSWORD({state}, password) {
            try {
                const res = await checkPassword({name: state.name, password: password})
                    return res.data
            } catch (err) {
                throw err
            }
        },
    }

}

export default user