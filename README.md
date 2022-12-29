# Nosana Validate Pipeline Schema

Simple to use library to validate Nosana Pipeline Schemas.
You can learn more about the pipeline at [Nosana Pipeline documentation](https://docs.nosana.io/pipelines/intro.html).

The schema can be found at [src/schema.ts](src/schema.ts).

When this library is bundled as ESM, types are also included.

## Quickstart

Install:

```bash
npm i @nosana-ci/schema-validator
```

There are two functions available for use:

- `validateJson`
- `validateYaml`

Example:

## Validate JSON

```javascript
import { validateJson } from '@nosana-ci/schema-validator'

const nosana_pipeline = {
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

validateJson(nosana_pipeline)
// => { valid: true, errors: []}

```

## Validate YAML

It is also possible to validate a YAML file:

```javascript

const yaml = `
nosana:
  description: Nosana-Node Pipeline
      
global:
  image: registry.hub.docker.com/library/cljkondo/clj-kondo
  
  trigger:
    branch:
      - main

  environment:
    DEBIAN_FRONTEND: noninteractive

jobs:
  - name: install and build container
    commands:
      - env
      - clj-kondo --lint src --dependencies --parallel --copy-configs
      - git submodule init
      - git submodule update
`

validateYaml(yaml)
// => { valid: true, errors: []}

```

## Errors

If the schema is invalid, the errors will be returned.
The `instancePath` will be the path to the invalid property and the `message` will be the reason why it is invalid.

```javascript
const nosana_pipeline ={
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
            "commands": {
                "one": "npm ci",
                "two": "npm run test"
            }
        }
    ]
}

validateJson(nosana_pipeline)
/* => validated {
  valid: false,
  errors: [
    {
      instancePath: '/jobs/0/commands',
      schemaPath: '#/properties/jobs/items/properties/commands/type',
      keyword: 'type',
      params: [Object],
      message: 'must be array',
      schema: 'array',
      parentSchema: [Object],
      data: [Object]
    }
  ],
*/

```
