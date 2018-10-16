import { createAction } from "redux-actions"
import { ActionFunction0, ActionFunction1 } from "redux-actions"
import { takeLatest } from "redux-saga/effects"

const getSagaActionType = (
  modelName: string,
  generatorName: string
): string => {
  return "SAGA." + modelName.toUpperCase() + "." + generatorName
}

let _name = "default"
export let sagaModel: { name: string; anonymousGeneratorIndex: number } = {
  name: _name,
  anonymousGeneratorIndex: 0,
}
Object.defineProperty(sagaModel, "name", {
  get: function() {
    return _name
  },
  set: function(newValue) {
    _name = newValue
    this.anonymousGeneratorIndex = 0
  },
})

export function createModel0(
  generator: GeneratorFunction0,
  takeFunction?: Function
): ActionFunction0<NIOAction0> {
  return _createModel(generator, () => {}, takeFunction)
}

export function createModel<Payload>(
  generator: GeneratorFunction<NIOAction<Payload>>,
  takeFunction?: Function
): ActionFunction1<Payload, NIOAction0> {
  return _createModel(generator, (payload: Payload) => payload, takeFunction)
}

function _createModel<Payload>(
  generator: Function,
  payloadCreator: (payload?: Payload) => Payload,
  takeFunction?: Function
) {
  const actionType = getSagaActionType(
    sagaModel.name,
    generator.name || (sagaModel.anonymousGeneratorIndex++).toString()
  )
  const actionCreator = createAction(actionType, payloadCreator) as any
  actionCreator.sagaGenerator = {
    generator,
    modelName: sagaModel.name,
    actionType,
    takeFunction: takeFunction || takeLatest,
  }
  return actionCreator
}

type GeneratorFunction0 = () => void
type GeneratorFunction<T> = (t: T) => void
