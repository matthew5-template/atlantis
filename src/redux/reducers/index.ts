import { combineReducers } from 'redux'
import contacts from './contacts'
import { getReducers } from '@/redux/modelUtils/convertor'

const reducerModels = {
  contacts,
}
const reducers = getReducers(reducerModels)

export default combineReducers(reducers)
