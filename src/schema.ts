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
            maxLength: 255
          }
        }
      },

      global: {
        type: "object",
        nullable: false,
        properties: {

          // 📦️ Container image to use for all jobs
          image: {
            type: "string",
            nullable: true,
            minLength: 1,
            maxLength: 4096
          },

          trigger: {
            type: "object",
            nullable: true,
            properties: {
              branch: {
                type: ["array", "string"],
                items: { type: "string" },
                nullable: true,
                uniqueItems: true
              }
            }
          },

          environment: {
            anyOf: [
              {
                type: "object",
                nullable: true,
                additionalProperties: { type: "string" } // Additional properties need to be of type string.
              },
              {
                type: "object",
                nullable: true,
                properties: {
                  type: {
                    type: "string",
                    nullable: false,
                  },
                  endpoint: {
                    type: "string",
                    nullable: false,
                  },
                  value: {
                    type: "string",
                    nullable: false,
                  }
                }
              }
            ]
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
              nullable: true,
              minLength: 1,
              maxLength: 4096
            },

            environment: {
              anyOf: [
                {
                  type: "object",
                  nullable: true,
                  additionalProperties: { type: "string" } // Additional properties need to be of type string.
                },
                {
                  type: "object",
                  nullable: true,
                  properties: {
                    type: {
                      type: "string",
                      nullable: false,
                    },
                    endpoint: {
                      type: "string",
                      nullable: false,
                    },
                    value: {
                      type: "string",
                      nullable: false,
                    }
                  }
                }
              ]
            },

            allow_failure: {
              type: "boolean",
              nullable: true
            },

            resources: {
              type: "array",
              nullable: true,
              items: {
                type: "string",
                nullable: true
              }
            },

            artifacts: {
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
              additionalItems: false,
              items: {
                anyOf: [
                  {
                    type: "string",
                    nullable: false,
                  },
                  {
                    type: "object",
                    nullable: false,
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

                      resources: {
                        type: "string",
                        nullable: true
                      },

                      artifacts: {
                        type: "array",
                        nullable: true,
                        items: {
                          type: "object",
                          nullable: true,
                          properties: {
                            name: {
                              type: "string",
                              nullable: false,
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
