import AJV, { JSONSchemaType,  } from "ajv"
import addFormats from "ajv-formats"

const ajv = new AJV({
  strict: false
});
addFormats(ajv)

interface NosJobData {
  nosana: object
  global: object
  jobs: Array<object>
}

const schema: JSONSchemaType<NosJobData> = {
  type: "object",

  properties: {
    nosana: {
      type: "object",
      nullable: false,
      properties: {
        description: {
          type: "string",
          nullable: false,
          minLength: 3,
          maxLength: 100
        }
      }
    },
    global: {
      type: "object",
      nullable: false,
      properties: {
        image: {
          type: "string",
          nullable: false,
          minLength: 3, // Not sure if this is a good minimum
          maxLength: 100 // This might need to be longer
        },
        trigger: {
          type: "object",
          nullable: true,
          properties: {
            branch: {
              type: "array",
              items: { type: "string" },
              nullable: true,
              uniqueItems: true
            }
          }
        },
        environment: { // This is an object containing key-value pairs.
          type: "object",
          nullable: true,
          additionalProperties: { type: "string" } // Additional properties need to be of type string.
        },
        allow_failure: {
          type: "boolean",
          nullable: true
        }
      }
    },
    jobs: {
      type: "array",
      nullable: false,
      items: {
        type: "object",
        nullable: false,
        properties: {
          name: {
            type: "string",
            nullable: false
          },
          image: {
            type: "string",
            nullable: true
          },
          allow_failure: {
            type: "boolean",
            nullable: true
          },
          resources: { // this is a list containing key-value pairs, so it should be an object.
            type: "array",
            nullable: true,
            items: {
              type: "object",
              nullable: true,
              properties: {
                name: {
                  type: "string",
                  nullable: false
                },
                path: {
                  type: "string",
                  nullable: false
                }
              }
            }
          },
          artifacts: { // this is a list containing key-value pairs, so it should be an object.
            type: "array",
            nullable: true,
            items: {
              type: "object",
              nullable: true,
              properties: {
                name: {
                  type: "string",
                  nullable: false
                },
                path: {
                  type: "string",
                  nullable: false
                }
              }
            }
          },
          commands: {
            type: "array",
            nullable: false,
            items: {
              anyOf: [
                {
                  type: "string",
                  nullable: false
                },
                {
                  type: "object",
                  properties: {
                    cmd: {
                      type: "string",
                      nullable: false
                    },
                    working_dir: {
                      type: "string",
                      nullable: true
                    },
                    allow_failure: {
                      type: "boolean",
                      nullable: true
                    },
                    resources: { // this is a list containing key-value pairs, so it should be an object.
                      type: "array",
                      nullable: true,
                      items: {
                        type: "object",
                        nullable: true,
                        properties: {
                          name: {
                            type: "string",
                            nullable: false
                          },
                          path: {
                            type: "string",
                            nullable: false
                          }
                        }
                      }
                    },
                    artifacts: { // this is a list containing key-value pairs, so it should be an object.
                      type: "array",
                      nullable: true,
                      items: {
                        type: "object",
                        nullable: true,
                        properties: {
                          name: {
                            type: "string",
                            nullable: false
                          },
                          path: {
                            type: "string",
                            nullable: false
                          }
                        }
                      }
                    },
                  }
                }
              ]
            }
          }
        }
      }
    }
  },

  required: ["nosana", "global", "jobs"],

  additionalProperties: false
}

const example = {
  "nosana": {
    "description": "Run Test"
  },
  "global": {
    "image": "registry.hub.docker.com/library/node:16",
    "trigger": {
      "branch": [
        "main"
      ]
    }
  },
  "jobs": [
    {
      "name": "install-deps and run test",
      "commands": [
        "npm ci",
        "npm run test"
      ]
    }
  ]
}

// validate is a type guard for MyData - type is inferred from schema type
const validate = ajv.compile(schema)
console.log('Validating schema', example)

if (validate(example)) {
  console.log('schema correct!')
} else {
  console.log('schema wrong!')
  for (const err of validate.errors) {
    console.log(err)
  }
}

