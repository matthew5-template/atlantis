import { registerSagaModels } from '@/redux/modelUtils/register'
import errorWrapper from './errorWrapper'
import * as contacts from './contacts'

const sagaModels = [contacts]

export function registerSagaWithMiddleware(middleware: { run: Function }) {
  registerSagaModels(sagaModels, middleware, errorWrapper)
}
