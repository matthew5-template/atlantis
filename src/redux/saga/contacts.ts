import { createAction, BaseSaga, ModelAction } from '@/redux-easy-model'
import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  take,
} from '@/redux-easy-model/effects'
import * as apis from '@/request/apis'
import reducer from '@/redux/reducers/contacts'
import { message } from 'antd'

class Contacts extends BaseSaga {
  requestContactsByPhoneNumber = createAction(function* get(
    action: ModelAction<string>
  ) {
    // const res = yield call(apis.requestContacts, action.payload)
    // TODO: mock
    const contacts = [
      {
        id: '8080',
        name: {
          first: 'John',
          last: 'Doe',
        },
        phone: action.payload,
        email: 'john@gmail.com',
      },
      {
        id: '8081',
        name: {
          first: 'Bruce',
          last: 'Wayne',
        },
        phone: action.payload,
        email: 'bruce.wayne@gmail.com',
      },
    ]
    const res = {
      data: {
        items: contacts,
      },
    }
    yield put(reducer.updateContacts(res.data))
  })
}

export default new Contacts()
