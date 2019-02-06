import { call } from 'redux-saga/effects'

export const sagaWrapper = (
  saga: (action: ModelAction<any>) => void,
  errorHandler?: (error: any) => void
) =>
  function*(action: ModelAction<any>) {
    try {
      const res = yield call(saga, action)
      action.resolve(res)
    } catch (error) {
      console.error('error occurred in saga', action)
      yield errorHandler && call(errorHandler, error)
      action.reject(error)
    }
  }
