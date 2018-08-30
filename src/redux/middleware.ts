import { AnyAction, Dispatch, Middleware } from 'redux'

const createExposedPromise = () => {
  const deferred = {
    resolve: null as (res: any) => void,
    reject: null as (err: any) => void,
  }

  const promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })

  return [promise, deferred]
}

export const extendSagaWithPromise: any = () => (next: Dispatch<any>) => (
  action: AnyAction
) => {
  if (!action.type.endsWith('_PROMISE')) {
    return next(action)
  }

  const [promise, deferred] = createExposedPromise()
  const newActions = { ...action, deferred }
  next(newActions)
  return promise
}
