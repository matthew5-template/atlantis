import * as _ from '@/redux/modelUtils/action'
import modelNames from '@/redux/modelUtils/names'

_.model.name = modelNames.reducer.contacts

export const initState: IStore.IContact = {
  items: [],
}

export const updateContacts = _.createModel(function update(
  state: IStore.IContact,
  action: ReduxActions.Action<{ items: any }>
) {
  return {
    items: action.payload.items,
  }
})
