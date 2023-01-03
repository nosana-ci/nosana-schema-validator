import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { validateJson, validateYaml } from '../../dist/index.js'

console.log("dirurl", import.meta.url)
const directory = dirname(import.meta.url.split(':').pop())
console.log("directory", directory)

const example_json = readFileSync(join(directory, "../nosana-ci.json"), "utf-8")
const exampe_yaml = readFileSync(join(directory, "../nosana-ci.yml"), "utf-8");
const error_json = readFileSync(join(directory, "../error-ci.json"), "utf-8");

const validYaml = () => {
  console.log("Validating Yaml Schema", exampe_yaml)
  const validated = validateYaml(exampe_yaml)

  if (validated.valid) {
    console.log("✅ Yaml Schema Correct.")
  } else {
    console.log("❌ Yaml Schema Incorrect.")
    if (validated.errors) {
      validated.errors.forEach(err => console.log(err))
    }
  }
}

const validJson = () => {

  const validated = validateJson(example_json)

  if (validated.valid) {
    console.log('✅ JSON Schema Correct!')
    console.log('validated', validated)
  } else {
    console.log('❌ JSON Schema Wrong!')
    console.log('validated', validated)
    if (validated.errors) {
      validated.errors.forEach(err => console.log(err))
    }
  }
}

const invalidJson = () => {
  const validated = validateJson(error_json)

  if (validated.valid) {
    console.log('✅ JSON Schema Correct!')
    console.log('validated', validated)
  } else {
    console.log('❌ JSON Schema Wrong!')
    console.log('validated', validated)
    if (validated.errors) {
      validated.errors.forEach(err => console.log(err))
    }
  }
}

invalidJson()
validYaml()
validJson()
