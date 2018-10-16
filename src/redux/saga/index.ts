import { registerSagaModels } from './register'
import errorWrapper from './errorWrapper'
import * as contacts from './models/contacts'

const sagaModels = [contacts]

export function registerSagaWithMiddleware(middleware: { run: Function }) {
  registerSagaModels(sagaModels, middleware, errorWrapper)
}