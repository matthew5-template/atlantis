const _modelNames = {
  saga: {
    contacts: '',
    scenario: {
      detail: {
        comment: '',
      },
    },
  },
  reducer: {
    contacts: '',
  },
}

function formatValue(obj: any, prefix?: string) {
  for (const key in obj) {
    const value = obj[key]
    if (typeof value == 'object') {
      const currentPrefix = (prefix || '') + key
      formatValue(value, currentPrefix + '_')
      value._name = currentPrefix
      value.toString = function() {
        return this._name
      }
    } else {
      obj[key] = key
      if (prefix) {
        obj[key] = prefix + obj[key]
      }
    }
  }
}

function getFormatedModelNames<Payload>(_modelNames: Payload): Payload {
  formatValue(_modelNames)
  return _modelNames
}

const modelNames = getFormatedModelNames(_modelNames)
