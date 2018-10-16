interface BaseAction {
    type: string
  }
  
  interface Action<Payload> extends BaseAction {
    payload?: Payload
    error?: boolean
  }
  
  interface NIOPromise {
    resolve: Function
    reject: Function
    then: Function
  }
  
  declare interface NIOAction0 extends Action<any>, NIOPromise {}
  
  declare interface NIOAction<Payload> extends Action<Payload>, NIOPromise {}
  