import { NosJobData } from "./types";
import { JSONSchemaType } from "ajv";

export const NosPipelineSchema: JSONSchemaType<NosJobData> = {
  type: "object",

  properties: {
    global: {
      type: "object",
      nullable: false,
      properties: {
        trigger: {
          type: "object",
          nullable: true,
          properties: {
            branch: {
              type: ["array", "string"],
              items: { type: "string" },
              nullable: true,
              uniqueItems: true,
            },
          },
        },

        secrets: {
          type: "array",
          items: { type: "string" },
          nullable: true,
          uniqueItems: true,
        },

        environment: {
          anyOf: [
            {
              type: "object",
              nullable: true,
              additionalProperties: { type: "string" }, // Additional properties need to be of type string.
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
                },
              },
            },
          ],
        },

        allow_failure: {
          type: "boolean",
          nullable: true,
        },
      },
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
            nullable: false,
          },

          image: {
            type: "string",
            nullable: true,
            minLength: 1,
            maxLength: 4096,
          },

          secrets: {
            type: "array",
            items: { type: "string" },
            nullable: true,
            uniqueItems: true,
          },

          environment: {
            anyOf: [
              {
                type: "object",
                nullable: true,
                additionalProperties: { type: "string" }, // Additional properties need to be of type string.
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
                  },
                },
              },
            ],
          },

          allow_failure: {
            type: "boolean",
            nullable: true,
          },

          resources: {
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
                  nullable: true,
                },
              },
            },
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
                  nullable: true,
                },
              },
            },
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
                      nullable: false,
                    },

                    working_dir: {
                      type: "string",
                      nullable: true,
                    },

                    allow_failure: {
                      type: "boolean",
                      nullable: true,
                    },

                    resources: {
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
                            nullable: true,
                          },
                        },
                      },
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
                            nullable: false,
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
  },

  required: ["global", "jobs"],

  additionalProperties: false,
};
