import { Actions } from '../actionTypes'
import { createAction } from 'redux-actions'

export const contacts_get = createAction(
  Actions.Contacts.get,
  (payload: { phoneNumber?: string }) => payload
)

export const contacts_setEmail = createAction(
  Actions.Contacts.setEmail,
  (payload: { id: number; email: string }) => payload
)
