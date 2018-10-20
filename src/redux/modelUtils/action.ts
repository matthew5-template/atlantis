import { createAction } from "redux-actions"
import { ActionFunction0, ActionFunction1 } from "redux-actions"
import { takeLatest, takeEvery } from "redux-saga/effects"
import { SagaIterator } from "redux-saga"

const _getActionType = (modelName: string, generatorName: string): string => {
  return modelName.toUpperCase() + "." + generatorName
}

let _name = "default"
export let model: { name: string; anonymousGeneratorIndex: number } = {
  name: _name,
  anonymousGeneratorIndex: 0,
}
Object.defineProperty(model, "name", {
  get: function() {
    return _name
  },
  set: function(newValue) {
    _name = newValue
    this.anonymousGeneratorIndex = 0
  },
})

export function createModel0(
  generator: NIOSagaGenerator0,
  takeFunction?: typeof takeEvery
): ActionFunction0<NIOAction0>
export function createModel0(
  reducer: NIOReducer1<NIOAction<any>>
): ActionFunction0<NIOAction0>
export function createModel0(
  method: Function,
  takeFunction?: typeof takeEvery
): ActionFunction0<NIOAction0> {
  return _createModel(method, () => {}, takeFunction)
}

export function createModel<Payload>(
  generator: NIOSagaGenerator1<NIOAction<Payload>>,
  takeFunction?: typeof takeEvery
): ActionFunction1<Payload, NIOAction0>
export function createModel<Payload>(
  reducer: NIOReducer2<any, NIOAction<Payload>>
): ActionFunction1<Payload, NIOAction0>
export function createModel<Payload>(
  method: Function,
  takeFunction?: typeof takeEvery
): ActionFunction1<Payload, NIOAction0> {
  return _createModel(method, (payload: Payload) => payload, takeFunction)
}

function _createModel<Payload>(
  method: Function,
  payloadCreator: (payload?: Payload) => Payload,
  takeFunction?: typeof takeEvery
) {
  const actionType = _getActionType(
    model.name,
    method.name || (model.anonymousGeneratorIndex++).toString()
  )
  const actionCreator = createAction(actionType, payloadCreator) as any
  const modelExtend: ModelExtend = {
    method,
    modelName: model.name,
    actionType,
    takeFunction: takeFunction || takeLatest,
  }
  actionCreator.modelExtend = modelExtend
  return actionCreator
}

export function getGenerator0(
  actionCreator: ActionFunction0<NIOAction0>
): NIOSagaGenerator0 {
  return _getMethod(actionCreator)
}
export function getGenerator<Payload>(
  actionCreator: ActionFunction1<Payload, NIOAction0>
): NIOSagaGenerator1<ReduxActions.Action<Payload>> {
  return _getMethod(actionCreator)
}

export function getReducer0(
  actionCreator: ActionFunction0<NIOAction0>
): NIOReducer1<any> {
  return _getMethod(actionCreator)
}
export function getReducer<Payload>(
  actionCreator: ActionFunction1<Payload, NIOAction0>
): NIOReducer2<any, ReduxActions.Action<any>> {
  return _getMethod(actionCreator)
}

export function getActionType(actionCreator: any): string {
  return _getModelExtend(actionCreator).actionType
}

function _getMethod(actionCreator: any) {
  return _getModelExtend(actionCreator).method
}

function _getModelExtend(actionCreator: any): ModelExtend {
  if (!actionCreator.modelExtend) {
    throw "this is not actionCreator"
  }
  return actionCreator.modelExtend
}

type NIOSagaGenerator0 = () => SagaIterator
type NIOSagaGenerator1<Action> = (a: Action) => SagaIterator
type NIOReducer1<State> = (s: State) => State
type NIOReducer2<State, Action> = (s: State, a: Action) => State
type ModelExtend = {
  method: any
  modelName: string
  actionType: string
  takeFunction?: typeof takeEvery
}
