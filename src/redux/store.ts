import { createStore, applyMiddleware } from 'redux'
import reducers from '@/redux/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'react-router-redux'
import history from './history'
import createSagaMiddleware from 'redux-saga'
import { registerSagaWithMiddleware } from './saga'
import { extendSagaWithPromise } from "@/redux/middlewares/sagaPromise"

const sagaMiddleware = createSagaMiddleware()
const middleware = composeWithDevTools(
  applyMiddleware(extendSagaWithPromise, routerMiddleware(history), sagaMiddleware)
)
const store = createStore(reducers, middleware)
registerSagaWithMiddleware(sagaMiddleware)

export default store
