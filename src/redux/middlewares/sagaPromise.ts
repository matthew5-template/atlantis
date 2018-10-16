import { AnyAction, Dispatch, Middleware } from 'redux'

const createExposedPromise = () => {
  let resolve: (res: any) => void = null
  let reject: (res: any) => void = null
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
  return [promise, resolve, reject]
}

export const extendSagaWithPromise: any = () => (next: Dispatch<any>) => (
  action: AnyAction
) => {
  const [promise, resolve, reject] = createExposedPromise()
  const newActions = {
    ...action,
    resolve,
    reject,
  }
  next(newActions)
  return promise
}
