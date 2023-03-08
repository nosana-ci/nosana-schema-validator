import AJV from "ajv"
// import addFormats from "ajv-formats"
import { NosPipelineSchema } from "./schema";
import { parse, stringify } from 'yaml'

// Create AJV
const ajv = new AJV({
  allErrors: true,
  verbose: true,
  allowUnionTypes: true,
  strict: false,
})

// Create validate function
export const validateJson = (schema: any) => {
  const parsed = JSON.parse(schema)
  const validate = ajv.compile(NosPipelineSchema)
  const valid = validate(parsed)
  return { valid, ...validate }
}

// yaml utility
export const validateYaml = (yaml: string) => validateJson(JSON.stringify(parse(yaml)))

export { NosPipelineSchema, parse as parseYaml, stringify as stringifyYaml }
