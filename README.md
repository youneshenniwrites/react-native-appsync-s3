# React Native AppSync S3 #

This app allows the user to do the following:

* Sign Up/In to the platform.
* Access device library using Expo.
* Upload pictures to AWS S3.
* Store the pictures records in Amazon DynamoDB.
* Display the pictures in the platform.

# Prerequisites

* [Expo CLI](https://docs.expo.io/versions/latest/workflow/expo-cli/)
  * `npm install -g expo-cli`
  
* [AWS account](https://aws.amazon.com/amplify/)

* [Node JS](https://nodejs.org/en/download/) with [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

* [AWS Amplify CLI](https://aws-amplify.github.io/)
  * `npm install -g @aws-amplify/cli`
  * `amplify configure` ([link](https://www.youtube.com/watch?v=fWbM5DLh25U) for a step by step video).

# Configuring the project

1. Clone this repo to your local machine.

```
git clone https://github.com/aws-samples/react-native-appsync-s3.git

cd react-native-appsync-s3
```

2. Add amplify dependencies to your project.

```
yarn add aws-amplify aws-amplify-react-native

# or

npm install aws-amplify aws-amplify-react-native
```

3. Initialise the amplify project.

```
amplify init
```

4. Configure an Amazon Cognito User Pool to store users credentials.
```
amplify add auth

# When prompt, choose: Yes, use the default configuration.
```

5. Add an Amazon S3 bucket to store pictures.

```
amplify add storage

# Choose: Content (Images, audio, video, etc.)
# Give access to only authenticated users.
# Give users read/write acces.
```

6. Add the AWS AppSync API to use GraphQL and store data in DynammoDB.

```
amplify add api

# Choose an authorization type for the API: Amazon Cognito User Pool
# Do you have an annotated GraphQL schema? Yes
# Provide your schema file path: src/graphQL/shcema.graphql
```

7. Deploy your project to the AWS.

```
amplify push

# When asked if you would like to generate client code, say no.
```

The AWS Amplify CLI will create an Amazon Cognito User Pool and Identity Pool, an Amazon S3 bucket to store each users photos and an AWS AppSync GraphQL API that uses Amazon DynamoDB to store data.

# Running the application

1. Install client dependencies.

```
yarn

# or

npm install
```

2. Launch the React Native app in your simulator.

```
expo start --ios

# or

expo start --android
```

3. Create a new user.

The app uses the Higher Order Component **withAuthenticator** (HOC) from AWS Amplify to perform the authentication flow: sign up, confirm sign up and sign in users.

4. Add and display pictures.

If the application runs successfully you should be able to press the add button, allow access to device library, and select a picture from your device. This will upload the picture to S3 then make a GraphQL call to enter the record into DynamoDB. You can then press the refresh button to display the picture on the screen.
