class GlobalStore {
  store: any

  getStore() {
    return this.store
  }

  setStore(store: any) {
    this.store = store
  }

  getState() {
    return this.store.getState()
  }
}

const globalStore = new GlobalStore()

export const dispatch = (action: any): Promise<any> => {
  return globalStore.store.dispatch(action)
}

export default globalStore
