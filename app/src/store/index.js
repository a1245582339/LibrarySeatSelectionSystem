import { createStore } from 'redux'
import student from '../reducer/student'
let store = createStore(student)

export default store