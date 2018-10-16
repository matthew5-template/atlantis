import { call } from 'redux-saga/effects'
import get from 'lodash-es/get'
import { message } from 'antd'
import throttle from 'lodash-es/throttle'

const showError = throttle((errorMsg: string) => {
  message.error(errorMsg)
}, 1000)

function ErrorHandle(error: Error) {
  console.error(error)
  const errorMsg =
    get(error, 'response.data.message') ||
    get(error, 'message') ||
    'Oops, unknown error!'
  // Why just IE show this error msg?
  if (errorMsg.toLowerCase() !== 'syntaxerror') {
    showError(errorMsg)
  }
}

export default (saga: (action: NIOAction<any>) => void) =>
  function*(action: NIOAction<any>) {
    try {
      const res = yield call(saga, action)
      action.resolve(res)
    } catch (error) {
      yield call(ErrorHandle, error)
      action.reject(error)
    }
  }
