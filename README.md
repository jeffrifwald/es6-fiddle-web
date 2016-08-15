ES6 Fiddle Web
===

[![Build Status](https://travis-ci.org/jmcriffey/es6-fiddle-web.png?branch=master)](https://travis-ci.org/jmcriffey/es6-fiddle-web)

See it online at [here](http://www.es6fiddle.net/)

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

# Copy the environment keys
# Change the MongoDB URL if yours is different. If you have the default configuration then it _should_ work
cp sample.env .env

# Open a new terminal window and start MongoDB
mongod

# Start the application
npm start