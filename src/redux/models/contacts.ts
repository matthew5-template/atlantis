import { requestContacts } from '@/request/api'
import namespace from './namespace'
import { Contacts } from '@/redux/actionTypes'
import { ReducerMap } from 'redux-actions'
import { portal_save } from '@/redux/actionCreators/portal'

const effects = {
  *[Contacts.get](
    action: ReduxActions.Action<{ phoneNumber: string }>,
    { call, put }
  ) {
    const payload = action.payload
    const res = yield call(requestContacts, payload.phoneNumber)
    yield put({ type: Contacts.set, payload: res.data })
    yield put({ type: Contacts.setTestStr, payload: payload })
    ;(action as any).__dva_resolve()
    yield put(
      portal_save({
        title: payload.phoneNumber,
        description: 'this is phone number',
      })
    )
  },
}

const reducers: ReducerMap<IStore.IContact, any> = {
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
}

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

  effects,
  reducers,
}
