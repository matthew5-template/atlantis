import { combineReducers } from 'redux'
import contacts from './contacts'
import { generateReducers } from '@/redux-easy-model'

const reducerModels = {
  contacts,
}
const reducers = generateReducers(reducerModels)

export default combineReducers(reducers)
