workflow "Build and Test" {
  on = "push"
  resolves = ["Run Unit tests"]
}

action "Install dependencies" {
  uses = "actions/npm@main"
  runs = "npm install"
}

action "Run integration tests" {
  uses = "docker://circleci/node:8-browsers"
  needs = "Install dependencies"
  runs = "npm run test"
}