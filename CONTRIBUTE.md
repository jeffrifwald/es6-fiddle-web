## Guide to Contributing

1. Download and Install MongoDB (or use a remote mongo instance)
2. Fork and clone the repo
3. Create a new branch with a descriptive name of your change
4. Run `npm install`
5. Configure mongo in your environment:
    1. Run the command `export MONGODB_URI='mongodb://localhost:27017/fiddles'` - the enviroment variables name should be 'MONGODB_URI'.
5. Start mongo in a new terminal instance by running `mongod`.
6. Run `npm start` in the same terminal window from step 5. This means the server will start correctly.
6. Make your changes
7. Run `npm test`
8. If the tests pass then commit
9. Submit a PR and ensure that TravisCI tests pass