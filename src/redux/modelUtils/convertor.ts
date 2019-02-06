import { all, call } from 'redux-saga/effects'
import { handleActions } from 'redux-actions'
import { sagaWrapper } from '@/redux/saga/wrapper'
import { ActionExtend } from '@/redux/modelUtils/action'
import { SagaIterator } from 'redux-saga'

export function getSagas(
  sagaModels: any[],
  errorHandler?: (error: any) => void
): SagaIterator[] {
  const _actionTypeCache: string[] = []
  const _modelNameCache: string[] = []

  const sagas = []
  sagaModels.forEach((model: any) => {
    const watchList: any = []
    let currentModelName
    for (const key in model) {
      const value = model[key]
      if (value.actionExtend) {
        const {
          method,
          modelName,
          actionType,
          takeFunction,
        } = value.actionExtend as ActionExtend
        if (_modelNameCache.includes(modelName)) {
          throw `throw by duplicate saga model name: ${modelName}, add a different model name :)`
        }
        if (_actionTypeCache.includes(actionType)) {
          throw `throw by duplicate action type: ${actionType}, add a different generator name in createAction :)`
        } else {
          _actionTypeCache.push(actionType)
        }
        currentModelName = modelName

        const wrapper = function*() {
          yield takeFunction(actionType, sagaWrapper(method, errorHandler))
        }
        watchList.push(call(wrapper))
      }
    }
    currentModelName && _modelNameCache.push(currentModelName)

    const saga = function*() {
      yield all(watchList)
    }
    sagas.push(saga)
  })

  return sagas
}

export function getReducers(reducerModels: object): object {
  const _actionTypeCache: string[] = []
  const _modelNameCache: string[] = []
  const reducers: any = {}
  for (const reducerKey in reducerModels) {
    const reducerModel = (reducerModels as any)[reducerKey]
    reducers[reducerKey] = getReducer(
      reducerModel,
      _modelNameCache,
      _actionTypeCache
    )
  }
  return reducers
}

export function getReducer(
  reducerModel: any,
  _modelNameCache?: string[],
  _actionTypeCache?: string[]
) {
  const initState = reducerModel.initState
  if (!initState) {
    throw `throw by lost init state in reducer model`
  }
  const reducerMap = {}
  let currentModelName
  for (const key in reducerModel) {
    const value = reducerModel[key]
    if (value.actionExtend) {
      const {
        method,
        modelName,
        actionType,
      } = value.actionExtend as ActionExtend
      if (_modelNameCache) {
        if (_modelNameCache.includes(modelName)) {
          throw `throw by duplicate reducer model name: ${modelName}, add a different model name :)`
        }
      }
      if (_actionTypeCache) {
        if (_actionTypeCache.includes(actionType)) {
          throw `throw by duplicate action type: ${actionType}, add a different generator name in createAction :)`
        } else {
          _actionTypeCache.push(actionType)
        }
      }
      currentModelName = modelName
      ;(reducerMap as any)[actionType] = method
    }
  }
  currentModelName && _modelNameCache && _modelNameCache.push(currentModelName)
  return handleActions(reducerMap, initState)
}
