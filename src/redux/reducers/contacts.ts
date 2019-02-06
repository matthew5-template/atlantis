import { createAction, BaseReducer } from '@/redux/modelUtils/action'

class Contacts extends BaseReducer {
  initState: IStore.IContact = {
    items: [],
  }

  updateContacts = createAction(function updateContacts(
    state: IStore.IContact,
    action: ModelAction<{ items: any }>
  ) {
    return {
      items: action.payload.items,
    }
  })
}

export default new Contacts()
