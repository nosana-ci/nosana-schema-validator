import AJV from "ajv"
// import addFormats from "ajv-formats"
import { NosPipelineSchema } from "./schema";
import { parse } from 'yaml'

// Create AJV
const ajv = new AJV({
  allErrors: true,
  verbose: true,
})

// Create validate function
export const validateJson = (schema: any) => {
  const parsed = JSON.parse(schema)
  const validate = ajv.compile(NosPipelineSchema)
  const valid = validate(parsed)
  return { valid, ...validate }
}

// yaml utility
export const validateYaml = (yaml: string) => validateJson(parse(yaml))

export { NosPipelineSchema, parse as parseYaml }
