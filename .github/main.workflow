workflow "Build and Test" {
  on = "push"
  resolves = ["Run Unit tests"]
}

action "Install dependencies" {
  uses = "actions/npm@master"
  runs = "npm install"
}

action "Run Unit tests" {
  uses = "docker://circleci/node:8-browsers"
  needs = "Install dependencies"
  runs = "npm run test"
}