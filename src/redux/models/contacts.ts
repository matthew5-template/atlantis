import { handleActions, ReducerMap } from 'redux-actions'
import { requestContacts } from '@/request/api'
import namespace from './namespace'
import { Contacts } from '@/redux/actionTypes'

export const contactInitState: IStore.IContact = {
  items: [
    {
      id: '0',
    } as Contact,
  ],
  test: 'default test',
}

export default {
  namespace: namespace.contact,

  state: contactInitState,

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      history.listen(location => {
        console.log('contacts history change', location)
      })
    },
  },

  effects: {
    *[Contacts.get](payload: { phoneNumber?: string }, { call, put }) {
      const res = yield call(requestContacts, payload.phoneNumber)
      yield put({ type: Contacts.set, payload: res.data })
      yield put({ type: Contacts.setTestStr, payload })
    },
  },

  reducers: {
    [Contacts.setTestStr](
      state: IStore.IContact,
      action: ReduxActions.Action<number>
    ) {
      return {
        ...state,
        test: 'set contacts string ' + action.payload,
      }
    },
    [Contacts.set](state: IStore.IContact, action: ReduxActions.Action<any>) {
      return {
        ...state,
        items: action.payload,
      }
    },
    [Contacts.setEmail](
      state: IStore.IContact,
      action: ReduxActions.Action<{ id: number; email: string }>
    ) {
      return {
        ...state,
        test: action.payload.email,
      }
    },
  },
}
