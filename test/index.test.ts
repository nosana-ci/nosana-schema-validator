import { validateJson, parseYaml, validateYaml } from "../src/index"
import { describe, expect, test } from "@jest/globals"
import { error_json, correct_json, yml_schema } from "./data"

test("validate Error Json", () => {
    expect(validateJson(error_json).valid).toBe(false)
})

test("Should return an error ", () => {
    expect(validateJson(error_json).errors).toHaveLength(1)
})

test("Should return an error on commands", () => {
    expect(validateJson(error_json).errors?.pop()?.schemaPath)
    .toEqual("#/properties/jobs/items/properties/commands/type")
})

test("validate Correct Json", () => {
    expect(validateYaml(correct_json).valid).toBe(true)
})

test("validateYaml", () => {
    expect(validateYaml(yml_schema).valid).toBe(true)
})
