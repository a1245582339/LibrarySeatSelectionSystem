import {
    getRepair,
    createRepair,
} from '@/api/repair';
const repair = {
    state: {
        list: []
    },

    mutations: {
        SET_REPAIR_LIST: (state, list) => {
            state.list = list
        },
        SET_MORE_LIST: (state, list) => {
            state.list.push(...list)
        }
    },

    actions: {
        async GET_REPAIR({
            commit
        }, query) {
            try {
                const res = await getRepair(query)
                if (res.data.code == '20000') {
                    if (query.page == 0) {
                        commit('SET_REPAIR_LIST', res.data.data)
                    } else {
                        commit('SET_MORE_LIST', res.data.data)
                    }
                    return res
                } else {
                    throw res.data.msg
                }
            } catch (err) {
                throw err
            }
        },
        async CREATE_REPAIR({}, data) {
            try {
                const res = await createRepair(data)
                console.log(res)
            } catch (err) {
                throw err
            }
        }
    }
}

export default repair