# Nosana Validate Pipeline Schema

Simple to use library to validate Nosana Pipeline Schemas.
You can learn more about the pipeline at [Nosana Pipeline documentation](https://docs.nosana.io/pipelines/intro.html).

The schema can be found at [src/schema.ts](src/schema.ts).

When this library is bundled as UMD and ESM, types are also included.

## Quickstart

Install:

```bash
npm i @nosana-ci/schema-validator
```

There are two functions available for use:

- `validateJson`
- `validateYaml`

Example:

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

validateJson(nosana_pipeline) // => true
```
