import AJV from "ajv"
// import addFormats from "ajv-formats"
import { NosPipelineSchema } from "./src/schema";
import { parse } from 'yaml'

// Create AJV
const ajv = new AJV({
  allErrors: true,
  verbose: true
})
// addFormats(ajv)

// Create validate function
const validateJson = ajv.compile(NosPipelineSchema)

// yaml utility
const validateYaml = (yaml: string) => validateJson(parse(yaml))

export { validateJson, validateYaml }