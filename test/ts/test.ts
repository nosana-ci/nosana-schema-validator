import { readFileSync } from 'fs'
import { resolve } from 'path'
import { validateJson, validateYaml } from '../../src/index'
import { exampe_yaml, example_json } from './example'

const example_json = readFileSync(resolve(import.meta.dir, "../nosana-ci.json"), "utf-8")
const exampe_yaml = readFileSync(resolve(import.meta.dir, "../nosana-ci.yml"), "utf-8");

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
  console.log('Validating JSON Schema', example_json)

  const validated = validateJson(example_json)

  if (validated.valid) {
    console.log('✅ JSON Schema Correct!')
  } else {
    console.log('❌ JSON Schema Wrong!')
    if (validated.errors) {
      validated.errors.forEach(err => console.log(err))
    }
  }
}

validJson()
validYaml()
