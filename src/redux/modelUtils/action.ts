import { createAction as _createAction_by_redux_actions } from 'redux-actions'
import { ActionFunction0, ActionFunction1 } from 'redux-actions'
import { takeLatest, takeEvery } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

const _getActionType = (modelName: string, generatorName: string): string => {
  return modelName + '.' + generatorName
}

let _name = 'default'
export let model: { name: string; anonymousGeneratorIndex: number } = {
  name: _name,
  anonymousGeneratorIndex: 0,
}
Object.defineProperty(model, 'name', {
  get: function() {
    return _name
  },
  set: function(newValue) {
    _name = newValue
    this.anonymousGeneratorIndex = 0
  },
})

export function createAction0(
  generator: ModelGenerator0,
  takeFunction?: typeof takeEvery
): ActionFunction0<ModelAction0>
export function createAction0(
  reducer: ModelReducer1<ModelAction<any>>
): ActionFunction0<ModelAction0>
export function createAction0(
  method: Function,
  takeFunction?: typeof takeEvery
): ActionFunction0<ModelAction0> {
  return _createAction(method, () => {}, takeFunction)
}

export function createAction<Payload>(
  generator: ModelGenerator1<ModelAction<Payload>>,
  takeFunction?: typeof takeEvery
): ActionFunction1<Payload, ModelAction0>
export function createAction<Payload>(
  reducer: ModelReducer2<any, ModelAction<Payload>>
): ActionFunction1<Payload, ModelAction0>
export function createAction<Payload>(
  method: Function,
  takeFunction?: typeof takeEvery
): ActionFunction1<Payload, ModelAction0> {
  return _createAction(method, (payload: Payload) => payload, takeFunction)
}

function _createAction<Payload>(
  method: Function,
  payloadCreator: (payload?: Payload) => Payload,
  takeFunction?: typeof takeEvery
) {
  const actionType = _getActionType(
    model.name,
    method.name || (model.anonymousGeneratorIndex++).toString()
  )
  const actionCreator = _createAction_by_redux_actions(
    actionType,
    payloadCreator
  ) as any
  const actionExtend: ActionExtend = {
    method,
    modelName: model.name,
    actionType,
    takeFunction: takeFunction || takeLatest,
  }
  actionCreator.actionExtend = actionExtend
  return actionCreator
}

export function getGenerator0(
  actionCreator: ActionFunction0<ModelAction0>
): ModelGenerator0 {
  return _getActionExtendMethod(actionCreator)
}
export function getGenerator<Payload>(
  actionCreator: ActionFunction1<Payload, ModelAction0>
): ModelGenerator1<ReduxActions.Action<Payload>> {
  return _getActionExtendMethod(actionCreator)
}

export function getReducer0(
  actionCreator: ActionFunction0<ModelAction0>
): ModelReducer1<any> {
  return _getActionExtendMethod(actionCreator)
}
export function getReducer<Payload>(
  actionCreator: ActionFunction1<Payload, ModelAction0>
): ModelReducer2<any, ReduxActions.Action<any>> {
  return _getActionExtendMethod(actionCreator)
}

export function getActionType(actionCreator: any): string {
  return _getActionExtend(actionCreator).actionType
}

function _getActionExtendMethod(actionCreator: any) {
  return _getActionExtend(actionCreator).method
}

function _getActionExtend(actionCreator: any): ActionExtend {
  if (!actionCreator.actionExtend) {
    throw 'this is not actionCreator'
  }
  return actionCreator.actionExtend
}

type ModelGenerator0 = () => SagaIterator
type ModelGenerator1<Action> = (a: Action) => SagaIterator
type ModelReducer1<State> = (s: State) => State
type ModelReducer2<State, Action> = (s: State, a: Action) => State

export type ActionExtend = {
  method: any
  modelName: string
  actionType: string
  takeFunction?: typeof takeEvery
}

export class BaseSaga {
  constructor() {
    model.name = 'SAGA_' + this.constructor.name
  }
}

export class BaseReducer {
  constructor() {
    model.name = 'REDUCER_' + this.constructor.name
  }
}
