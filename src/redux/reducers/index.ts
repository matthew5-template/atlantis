import { combineReducers } from 'redux'
import contacts from './contacts'
import { getReducersByModels } from '@/redux/modelUtils/register'

const reducerModels = {
  contacts,
}
const reducers = getReducersByModels(reducerModels)

export default combineReducers(reducers)
