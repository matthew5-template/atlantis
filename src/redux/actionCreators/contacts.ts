import { Actions } from '../actionTypes'
import { createAction } from 'redux-actions'

export const getContacts = createAction(
  Actions.Contacts.get,
  (payload: { phoneNumber?: string }) => payload
)

export const setContactsEmail = createAction(
  Actions.Contacts.setEmail,
  (payload: { id: number; email: string }) => payload
)
