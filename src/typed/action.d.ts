interface Action<Payload> {
  type: string
  payload?: Payload
  error?: boolean
}

interface ModelPromise {
  resolve: Function
  reject: Function
  then: Function
}

declare interface ModelAction0 extends Action<any>, ModelPromise {}

declare interface ModelAction<Payload> extends Action<Payload>, ModelPromise {}
