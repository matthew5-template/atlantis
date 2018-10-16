import { handleActions, ReducerMap } from 'redux-actions'
import { ACTIONS } from '../actionTypes'

export const contactInitState: IStore.IContact = {
  items: [],
}

const actionHandle: ReducerMap<IStore.IContact, any> = {
  [ACTIONS.UPDATE_CONTACTS]: (
    state: IStore.IContact,
    action: ReduxActions.Action<{ items: any }>
  ) => {
    return {
      items: action.payload.items,
    }
  },
}

export default handleActions(actionHandle, contactInitState)
