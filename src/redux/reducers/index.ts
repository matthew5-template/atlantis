import { combineReducers } from 'redux'
import * as contact from './contacts'
import { getReducersByModels } from '@/redux/saga/register'

const reducerModels = {
  contact,
}
const reducers = getReducersByModels(reducerModels)

export default combineReducers(reducers)
