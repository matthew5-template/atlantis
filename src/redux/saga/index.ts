import { getSagas } from '@/redux/modelUtils/convertor'
import contacts from './contacts'
import get from 'lodash-es/get'
import { message } from 'antd'
import throttle from 'lodash-es/throttle'

const showError = throttle((errorMsg: string) => {
  message.error(errorMsg)
}, 1000)

function errorHandler(error: Error) {
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

const sagaModels = [contacts]

export function registerSagaWithMiddleware(middleware: { run: Function }) {
  const sagas = getSagas(sagaModels, errorHandler)
  sagas.forEach(saga => middleware.run(saga))
}
