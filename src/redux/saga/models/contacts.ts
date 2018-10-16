import * as _ from '@/redux/actions/utils'
import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  take,
} from 'redux-saga/effects'
import * as apis from '@/request/apis'
import * as actions from '@/redux/actions/contacts'
import { message } from 'antd'
import modelNames from '@/redux/saga/names'

_.sagaModel.name = modelNames.contacts

export const requestContactsByPhoneNumber = _.createModel(function* get(
  action: NIOAction<string>
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
  yield put(actions.updateContacts(res.data))
})