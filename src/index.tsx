import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Root from './Root'
import './antd-style'
import './styles/global-style.scss'
import { ConnectedRouter } from 'react-router-redux'
import globalStore from '@/globalStore'

import dva from 'dva'
import models from '@/redux/models'
import errorHandler from '@/redux/errorHandler'
import { extendSagaWithPromise } from './redux/middleware'

const router = ({ app, history }) => (
  <ConnectedRouter history={history}>
    <Root />
  </ConnectedRouter>
)

const app = dva()
// onAction: [extendSagaWithPromise]
app.use({ onError: errorHandler })
models.forEach((model: any) => {
  app.model(model)
})
app.router(router)
app.start('#root')

globalStore.setStore((app as any)._store)
