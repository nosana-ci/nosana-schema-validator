import { validateJson, parseYaml, validateYaml } from "../src/index"
import { describe, expect, test } from "@jest/globals"
import { error_list_json, error_json, correct_json, yml_schema } from "./data"

describe("\n📜✅ validateYaml with valid yaml", () => {

    test("validateYaml", () => {
        expect(validateYaml(yml_schema).valid).toBe(true)
    })

})

describe("\n📜❌ validateYaml with invalid yaml", () => {

    test("validateYaml", () => {
        expect(validateYaml("test").valid).toBe(false)
    })

})

describe("\n🏒✅ validateJson with valid json", () => {

    test("validate Correct Json", () => {
        expect(validateYaml(correct_json).valid).toBe(true)
    })

})

describe("\n🏒❌ validateJson with invalid json", () => {

    test("Should return false on nested list", () => {
        expect(validateJson(error_list_json).valid).toBe(false)
    })

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

})
