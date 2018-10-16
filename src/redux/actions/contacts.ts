import { ACTIONS } from '../actionTypes'
import { createAction } from 'redux-actions'

export const updateContacts = createAction(
  ACTIONS.UPDATE_CONTACTS,
  (payload: { items: any }) => payload
)
