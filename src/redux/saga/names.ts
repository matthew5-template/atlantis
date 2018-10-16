const _modelNames = {
  contacts: '',
  scenario: {
    detail: {
      comment: '',
    },
  },
}

const appendKey = '_name'
function formatValue(obj: any, prefix?: string) {
  for (const key in obj) {
    const value = obj[key]
    if (typeof value == 'object') {
      const currentPrefix = (prefix || '') + key
      value[appendKey] = currentPrefix
      formatValue(value, currentPrefix + '_')
    } else {
      if (key != appendKey) {
        obj[key] = key
        if (prefix) {
          obj[key] = prefix + obj[key]
        }
      }
    }
  }
}

function getFormatedModelNames<Payload>(_modelNames: Payload): Payload {
  formatValue(_modelNames)
  return _modelNames
}

export default getFormatedModelNames(_modelNames)
