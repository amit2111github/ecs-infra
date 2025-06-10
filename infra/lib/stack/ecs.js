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
    const repo = ecr.Repository.fromRepositoryName(
      this,
      "MyEcrRepo",
      "my-ecr-repo" // Replace with your ECR repo name
    );
    const taskDefinition = new ecs.FargateTaskDefinition(this, "MyTaskDef", {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    taskDefinition.addContainer("MyContainer", {
      image: ecs.ContainerImage.fromEcrRepository(repo, "latest"),
      portMappings: [{ containerPort: 4000 }],
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

