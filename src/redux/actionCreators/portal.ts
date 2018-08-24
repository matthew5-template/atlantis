import { Actions } from '../actionTypes'
import { createAction } from 'redux-actions'

export const savePortal = createAction(
  Actions.Portal.save,
  (payload: { title: string; description: string }) => payload
)