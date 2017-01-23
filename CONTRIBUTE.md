## Guide to Contributing

1. Download and Install MongoDB (or use a remote mongo instance) - https://docs.mongodb.com/manual/installation/
2. Fork and clone the repo (Develop Branch)
3. Create a new branch with a descriptive name of your change
4. Run `npm install`
5. Configure mongo in your environment:
    1. Run the command `export MONGODB_URI='mongodb://localhost:27017/fiddles'` - the enviroment variables name should be 'MONGODB_URI'.
5. Start mongo in a new terminal instance by running `mongod`.
6. Run `npm start` in the same terminal window from step 5. This means the server will start correctly.
6. Make your changes
7. Run `npm test`
8. If the tests pass then commit
9. Submit a PR against the Develop Branch and ensure that TravisCI tests pass
10. Once a pull request has been approved it will be merged into the Devlop Branch.
11. Only then once it has gone through a final screening will it be pulled through to the Master branch.

## Need Further Help

We are always willing to provide a helping hand, so please feel free to comment on tickets for more information or you can also join us via gitter. https://gitter.im/esfiddle/Lobby
