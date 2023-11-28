import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import * as lambda from "aws-cdk-lib/aws-lambda"

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new lambda.Function(this, "MyFunction", {
      code: lambda.Code.fromAsset("./", {
        bundling: {
          image: lambda.Runtime.NODEJS_18_X.bundlingImage,
          command: [
            "bash",
            "-c",
            `
            npm install
            npx ts-node build.ts "/asset-input/src/main.ts" "/asset-input/dist"
            cp /asset-input/dist/main.mjs /asset-output
            rm -rf /asset-input/dist
          `,
          ],
          user: "root",
        },
      }),
      handler: "main.handler",
      runtime: lambda.Runtime.NODEJS_18_X,
      architecture: lambda.Architecture.ARM_64,
    })
  }
}
