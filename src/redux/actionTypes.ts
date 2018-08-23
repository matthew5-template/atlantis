import clone from 'lodash-es/clone'
import namespace from './models/namespace'

export const Contacts = {
  get: 'GET',
  set: 'SET',
  setEmail: 'SET_EMAIL',
  setTestStr: 'SET_TEST_STR',
}

function getAction<T>(innerActionType: T, prefix: string): T {
  const copy = clone(innerActionType)
  Object.keys(copy).forEach(key => {
    copy[key] = prefix + '/' + copy[key]
  })

  return copy
}

export const Actions = {
  Contacts: getAction(Contacts, namespace.contact),
}
