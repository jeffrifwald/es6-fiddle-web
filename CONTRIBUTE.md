## Guide to Contributing

1. Download and Install MongoDB
2. Fork and clone the repo
3. Create a new branch with a descriptive name of your change.
4. Run `npm install`
5. Configure mongo environment key
  1. Run cp sample.env .env
  2. Ensure that the mongodb url is correct
5. Run `npm start`
6. Make your changes
7. Run `npm test`
8. If the tests pass then commit
9. Submit a PR and ensure that TravisCI tests pass.