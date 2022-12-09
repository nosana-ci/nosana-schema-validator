import { NosJobData } from "./types"
import { JSONSchemaType } from 'ajv'

export const NosPipelineSchema: JSONSchemaType<NosJobData> = {
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
