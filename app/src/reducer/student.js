const INIT_STUDENT = 'INIT_STUDENT'

export default (state, action) => {
    if (!state) {
        state = { student: {} }
    }
    switch (action.type) {
        case INIT_STUDENT:
            return { student: action.comments }
        default:
            return state
    }
}

export const initStudent = (comments) => {
    return { type: INIT_STUDENT, comments }
}