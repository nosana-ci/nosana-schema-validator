export const correct_json = `
{
  "global": {
      "image": "registry.hub.docker.com/library/node:16",
      "trigger": {
          "branch": [
              "main",
              "develop"
          ]
      },
      "environment": {
          "APP_ENV": "production"
      },
      "allow_failure": true
  },
  "jobs": [
      {
          "name": "install",
          "commands": [
              "npm ci"
          ],
          "artifacts": [
              {
                  "name": "node_modules",
                  "path": "./node_modules/"
              }
          ]
      },
      {
          "name": "generate",
          "commands": [
              "npm run eslint",
              "npm run prettier",
              "npm run generate"
          ],
          "resources": [
              "node_modules"
          ],
          "artifacts": [
              {
                  "name": "dist",
                  "path": "./dist/"
              }
          ]
      }
  ]
}`;

export const error_json = `
{
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
`;

export const error_list_json = `
{
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
            ["npm run test", "npm run test2"]
          ]
          
      }
  ]
}
`;

export const yml_schema = `
global:
  image: registry.hub.docker.com/library/cljkondo/clj-kondo
  
  trigger:
    branch:
      - main

  environment:
    DEBIAN_FRONTEND: noninteractive

jobs:
  - name: install and build container
    environment:
      DOCKER_ENV_PAT:
        type: nosana/secret
        endpoint: https://secrets.k8s.dev.nos.ci
        value: DOCKER_PAT
    commands:
      - env
      - clj-kondo --lint src --dependencies --parallel --copy-configs
      - git submodule init
      - git submodule update
      - clj-kondo --lint src --dependencies --parallel --copy-configs
      - clj -X:compile
      - clj -T:container build :config '{:main "nosana-node.main" :aliases [:production] :aot true :target-image {:image-name "djmbritt/nosana-node" :type :registry :username "djmbritt" :password $DOCKER_ENV_PAT}}'
`;
