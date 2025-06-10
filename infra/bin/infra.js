#!/usr/bin/env node
import cdk from "aws-cdk-lib";
import { EcsTask } from "../lib/stack/ecs.js";
const app = new cdk.App();

const main = () => {
  console.log("Started the app creation");
  new EcsTask(app, "InfraStack", {});
};

main();
