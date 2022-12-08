import AJV from "ajv"
import addFormats from "ajv-formats"
import { NosPipelineSchema } from "./schema";
import { parse } from 'yaml'

// Create AJV
const ajv = new AJV()
addFormats(ajv)

// Create validate function
const validateJson = ajv.compile(NosPipelineSchema)

// yaml utilities
const validateYaml = (yaml: string) => validateJson(parse(yaml))

export { validateJson, validateYaml }