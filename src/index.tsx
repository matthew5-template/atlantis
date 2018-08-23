import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Root from './Root'
import './antd-style'
import './styles/global-style.scss'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import globalStore from '@/globalStore'
import history from '@/redux/history'

import dva, { onActionFunc } from 'dva'
import models from '@/redux/models'
import errorHandler from '@/redux/errorHandler'

import { Actions } from '@/redux/actionTypes'

const router = () => (
  <ConnectedRouter history={history}>
    <Root />
  </ConnectedRouter>
)

const app = dva()
app.use({ onError: errorHandler })
models.forEach((model: any) => {
  app.model(model)
})
app.router(router)
app.start('#root')

globalStore.setStore((app as any)._store)
