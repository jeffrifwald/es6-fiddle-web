## Guide to Contributing

1. Download and Install MongoDB (or use a remote mongo instance)
2. Fork and clone the repo
3. Create a new branch with a descriptive name of your change
4. Run `npm install`
5. Configure mongo in your environment:
    1. MONGOHQURL='mongodb://localhost:27017/fiddles' or something similar
5. Run `npm start`
6. Make your changes
7. Run `npm test`
8. If the tests pass then commit
9. Submit a PR and ensure that TravisCI tests pass
