ESFiddle
===

[![Build Status](https://travis-ci.org/esfiddle/esfiddle.png?branch=master)](https://travis-ci.org/esfiddle/esfiddle)

Try out the latest ES6+ features right in your browser.

See it online [here](https://esfiddle.net/).

We welcome pull requests from first-timers and seasoned veteran programmers alike. Follow the steps below to get setup. Then have a look at some of the [projects issues](https://github.com/esfiddle/esfiddle/labels/up-for-grabs)

### Getting Started
*This guide assumes you already have MongoDB and NodeJS installed.*

Clone the repository
```bash
# Get the latest version
git clone git@github.com:esfiddle/esfiddle.git

# Change directory
cd esfiddle

# Install Npm dependencies
npm install

# Add a MONGODB_URI to your environment
export MONGODB_URI='mongodb://localhost:27017/fiddles'

# Open a new terminal window and start MongoDB
mongod

# Start the application
npm start
