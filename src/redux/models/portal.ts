import namespace from './namespace'
import { Portal, Actions } from '@/redux/actionTypes'
import { ReducerMap } from 'redux-actions'

const effects = {
  *[Portal.fetch]({ payload }: ReduxActions.Action<any>, { call, put }) {
    // eslint-disable-line
    yield put({ type: Portal.save })
  },
}

const reducers: ReducerMap<IStore.IPortal, any> = {
  [Portal.save](
    state: IStore.IPortal,
    action: ReduxActions.Action<{ title: string; description: string }>
  ) {
    return { ...state, ...action.payload }
  },
}

export const initState: IStore.IPortal = {
  title: 'default t',
  description: 'default d',
}

export default {
  namespace: namespace.portal,

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      history.listen(location => {})
    },
  },

  effects,
  reducers,
}
