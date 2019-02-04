import { createModel, BaseModel } from '@/redux/modelUtils/action'

class ContactsReducer extends BaseModel {
  initState: IStore.IContact = {
    items: [],
  }

  updateContacts = createModel(function updateContacts(
    state: IStore.IContact,
    action: Action<{ items: any }>
  ) {
    return {
      items: action.payload.items,
    }
  })
}

export default new ContactsReducer()
