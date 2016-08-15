ES6 Fiddle Web
===

[![Build Status](https://travis-ci.org/jmcriffey/es6-fiddle-web.png?branch=master)](https://travis-ci.org/jmcriffey/es6-fiddle-web)

See it online at [here](https://es6fiddle.net/)

### Getting Started
*This guide assumes you already have MongoDB and NodeJS installed.*

Clone the repository
```bash
# Get the latest version
git clone git@github.com:jmcriffey/es6-fiddle-web.git

# Change directory
cd es6-fiddle-web

# Install Npm dependancies
npm Install

# Add a MONGOHQ_URL to your environment
export MONGOHQ_URL='mongodb://localhost:27017/fiddles'

# Open a new terminal window and start MongoDB
mongod

# Start the application
npm start
