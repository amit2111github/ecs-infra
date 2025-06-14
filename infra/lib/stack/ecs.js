import { Stack, Duration } from "aws-cdk-lib";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export class EcsTask extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "MyVpc", { maxAzs: 2 });

    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc,
      clusterName: "demo-ecs-cluster",
    });

    // ✅ Create ECR Repository (instead of referencing existing one)
    const repo = new ecr.Repository(this, "MyEcrRepo", {
      repositoryName: "my-ecr-repo", // You can change this name if you like
    });

    const taskDefinition = new ecs.FargateTaskDefinition(this, "MyTaskDef", {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    taskDefinition.addContainer("MyContainer", {
      image: ecs.ContainerImage.fromEcrRepository(repo, "latest"), 
      portMappings: [{ containerPort: 4000 }],
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: "ecs", // Can be any name
      }),
    });

    new ecs.FargateService(this, "MyService", {
      cluster,
      taskDefinition,
      serviceName: "my-ecs-service",
      desiredCount: 1,
      assignPublicIp: true,
    });
  }
}
