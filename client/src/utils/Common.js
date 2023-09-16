// converting an array of fields into value of formData
export function stateValues(fields) {
  return fields.reduce((fieldsObj, field) => {
    let name = field.name.replace(' ', '')
    name = name[0].toLowerCase() + name.substr(1)
    return { ...fieldsObj, [name]: '' }
  }, {})
}


// adds a variable name to the array of fields to formData
export function fieldValues(fields) {
  return fields.map(field => {
    let name = field.name.replace(' ', '')
    name = name[0].toLowerCase() + name.substr(1)
    return { ...field, variable: name }
  })
}