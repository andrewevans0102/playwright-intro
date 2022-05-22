# Playwright Intro

This project goes with my post [Playwright for End to End Tests](https://rhythmandbinary.com/post/2022-05-22-playwright-for-end-to-end-tests).

This project uses AWS Amplify Auth for login and logout. To run this yourself you must first do the following:

```bash
npm install -g @aws-amplify/cli

cd <YOUR_PROJECT>

amplify init

amplify add auth

amplify push
```

The auth credentials are stored in a file you need to create called `local.env`. Create this at the project root with the following:

```bash
REACT_APP_PLAYWRIGHT_USERNAME=<USER_EMAIL>
REACT_APP_PLAYWRIGHT_PASSWORD=<USER_PASSWORD>
```

From there you can use the login component to create a user, or go to the AWS console and do the same. If you have questions, I recommend checking out [the Amplify Auth Docs](https://docs.amplify.aws/cli/auth/overview/).

## Automation

I have several npm scripts that you can use to run the project:

-   "e2e-headless"
    -   runs the tests in "headless mode"
-   "e2e-headed"
    -   runs the tests in "headed mode"
-   "e2e-record"
    -   runs Playwright's code generation tool and the app alongside it
-   "e2e-report"
    -runs Playwright's report that you can interact with
