import get from 'lodash-es/get'
import { message } from 'antd'
import throttle from 'lodash-es/throttle'

const showError = throttle((errorMsg: string) => {
  message.error(errorMsg)
}, 1000)

export default function(error: Error) {
  console.error(error)
  const errorMsg =
    get(error, 'response.data.message') ||
    get(error, 'message') ||
    'Oops, unknown error!'
  showError(errorMsg)
}
