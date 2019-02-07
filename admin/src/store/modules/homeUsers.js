import {
    getHomeUsers,
    delUser,
    checkUser
} from '@/api/homeUsers';
const homeUsers = {
    state: {
        list:[]
    },

    mutations: {
        SET_HOME_USERS: (state, list) => {
            state.list = list
        },
        SET_MORE_LIST: (state, list) => {
            state.list.push(...list)
        }
    },

    actions: {
        async GET_HOME_USERS({
            commit
        }, query) {
            try {
                const res = await getHomeUsers(query)
                if (res.data.code == '20000') {
                    if (query.page == 0) {
                        commit('SET_HOME_USERS', res.data.data)
                    } else {
                        commit('SET_MORE_LIST', res.data.data)
                    }
                    return res
                } else {
                    throw res.data.msg
                }
                return res
            } catch (err) {
                throw err
            }
        },
        async DEL_USER({}, id) {
            try {
                const res = await delUser(id)
                if (res.data.code == '20000') {
                    return res.data.msg
                } else {
                    throw res.data.msg
                }
            } catch (err) {
                throw err
            }
        },
        async CHECK_USER({}, id) {
            try {
                const res = await checkUser(id)
                if (res.data.code == '20000') {
                    return res.data.msg
                } else {
                    throw res.data.msg
                }
            } catch (err) {
                throw err
            }
        }
    }
}

export default homeUsers