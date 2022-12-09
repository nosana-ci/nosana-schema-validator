import { readFileSync } from 'fs'
import { resolve } from "path"

const example_json = JSON.parse(readFileSync(resolve(import.meta.dir, "./nosana-ci.json"), "utf-8"));
const exampe_yaml = readFileSync(resolve(import.meta.dir, "./nosana-ci.yml"), "utf-8");

export { example_json, exampe_yaml }