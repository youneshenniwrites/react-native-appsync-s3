# React Native AppSync S3 #

This app allows the user to do the following:

* Sign Up/In to the platform.
* Access device library using Expo.
* Upload pictures to AWS S3.
* Store their metadata in AWS DynamoDB.
* Display the pictures in the platform.

# Prerequisites

* [Expo CLI](https://docs.expo.io/versions/latest/workflow/expo-cli/)
  * `npm install -g expo-cli`
  
* [AWS account](https://aws.amazon.com/amplify/)

* [Node JS](https://nodejs.org/en/download/) with [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

* [AWS Amplify CLI](https://aws-amplify.github.io/)
  * `npm install -g @aws-amplify/cli`
  * `amplify configure` ([link](https://www.youtube.com/watch?v=fWbM5DLh25U) for a step by step video).

# Getting started

1. Clone this repo to your local machine.

```
git clone https://github.com/aws-samples/react-native-appsync-s3.git

cd react-native-appsync-s3
```

2. Add amplify dependencies to your project.

```
npm install aws-amplify aws-amplify-react-native
```

  or
  
```
yarn add aws-amplify aws-amplify-react-native
```

3. Initialise the amplify project.

```
amplify init
```

4. Configure an Amazon Cognito User Pool to manage user credentials.
```
amplify add auth
```
**When prompt, choose: Yes, use the default configuration.**

5. Configure an Amazon S3 bucket to store files.

```
amplify add storage
```
