class StoreCache {
  store: any

  setStore(store: any) {
    this.store = store
  }

  getState() {
    return this.store.getState()
  }

  dispatch(action: any) {
    return this.store.dispatch(action)
  }
}

export default new StoreCache()
