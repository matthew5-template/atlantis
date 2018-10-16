import { all, call } from "redux-saga/effects"

export function registerSagaModels(
  sagaModels: any[],
  middleware: { run: Function },
  errorWrapper: Function
) {
  const _sagaActionTypeCache: string[] = []
  const _sagaModelNameCache: string[] = []

  sagaModels.forEach((model: any) => {
    const watchList: any = []
    let currentModelName
    for (const key in model) {
      const method = model[key]
      if (method.sagaGenerator) {
        const {
          generator,
          modelName,
          actionType,
          takeFunction,
        } = (method as any).sagaGenerator
        if (_sagaModelNameCache.includes(modelName)) {
          throw `throw by duplicate saga model name: ${modelName}, add a different _.sagaModel.name = "xxx" :)`
        }
        if (_sagaActionTypeCache.includes(actionType)) {
          throw `throw by duplicate action type: ${actionType}, add a different generator name in _.createModel :)`
        } else {
          _sagaActionTypeCache.push(actionType)
        }
        currentModelName = modelName

        const wrapper = function*() {
          yield takeFunction(actionType, errorWrapper(generator))
        }
        watchList.push(call(wrapper))
      }
    }
    currentModelName && _sagaModelNameCache.push(currentModelName)

    const sagaWrapper = function*() {
      yield all(watchList)
    }
    middleware.run(sagaWrapper)
  })
}
