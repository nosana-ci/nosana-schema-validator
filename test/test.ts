import { validateJson, validateYaml } from '../index'
import { exampe_yaml, example_json } from './example'

const validYaml = () => {
  console.log("Validating Yaml Schema", exampe_yaml)
  const validated = validateYaml(exampe_yaml)

  if (validated) {
    console.log("✅ Yaml Schema Correct.")
  } else {
    console.log("❌ Yaml Schema Incorrect.")
    if (validateJson.errors) {
      validateJson?.errors?.forEach(err => console.log(err))
    }
  }
}

const validJson = () => {
  console.log('Validating JSON Schema', example_json)

  const validated = validateJson(example_json)

  if (validated) {
    console.log('✅ JSON Schema Correct!')
  } else {
    console.log('❌ JSON Schema Wrong!')
    validateJson?.errors?.forEach(err => console.log(err))
  }
}

validJson()
validYaml()
