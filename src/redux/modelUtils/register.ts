import { all, call } from "redux-saga/effects"
import { handleActions } from "redux-actions"

export function registerSagaModels(
  sagaModels: any[],
  middleware: { run: Function },
  errorWrapper: Function
) {
  const _actionTypeCache: string[] = []
  const _modelNameCache: string[] = []

  sagaModels.forEach((model: any) => {
    const watchList: any = []
    let currentModelName
    for (const key in model) {
      const value = model[key]
      if (value.modelExtend) {
        const {
          method,
          modelName,
          actionType,
          takeFunction,
        } = value.modelExtend
        if (_modelNameCache.includes(modelName)) {
          throw `throw by duplicate saga model name: ${modelName}, add a different model name :)`
        }
        if (_actionTypeCache.includes(actionType)) {
          throw `throw by duplicate action type: ${actionType}, add a different generator name in _.createModel :)`
        } else {
          _actionTypeCache.push(actionType)
        }
        currentModelName = modelName

        const wrapper = function*() {
          yield takeFunction(actionType, errorWrapper(method))
        }
        watchList.push(call(wrapper))
      }
    }
    currentModelName && _modelNameCache.push(currentModelName)

    const sagaWrapper = function*() {
      yield all(watchList)
    }
    middleware.run(sagaWrapper)
  })
}

export function getReducersByModels(reducerModels: object): object {
  const _actionTypeCache: string[] = []
  const _modelNameCache: string[] = []
  const reducers: any = {}
  for (const reducerKey in reducerModels) {
    const reducerModel = (reducerModels as any)[reducerKey]
    reducers[reducerKey] = getReducerHandleActions(
      reducerModel,
      _modelNameCache,
      _actionTypeCache
    )
  }
  return reducers
}

export function getReducerHandleActions(
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
    if (value.modelExtend) {
      const { method, modelName, actionType } = value.modelExtend
      if (_modelNameCache) {
        if (_modelNameCache.includes(modelName)) {
          throw `throw by duplicate reducer model name: ${modelName}, add a different model name :)`
        }
      }
      if (_actionTypeCache) {
        if (_actionTypeCache.includes(actionType)) {
          throw `throw by duplicate action type: ${actionType}, add a different generator name in _.createModel :)`
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
