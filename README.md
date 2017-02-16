ESFiddle
===

[![Build Status](https://travis-ci.org/esfiddle/esfiddle.png?branch=master)](https://travis-ci.org/esfiddle/esfiddle) [![Join the chat at https://gitter.im/esfiddle/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/esfiddle/Lobby)

Try out the latest ES6+ features right in your browser.

See it online [here](https://esfiddle.net/).

Getting Started
------------
*This guide assumes you already have MongoDB and NodeJS installed.*

Clone the repository
```bash
# Get the latest version
git clone git@github.com:esfiddle/esfiddle.git

# Change directory
cd esfiddle

# Update PRIVATE variables in sample.env file and rename it to '.env'
mv sample.env .env

# Open a new terminal window and start MongoDB
mongod --dbpath path/to/your/db/folder

# Start the application
npm start
```

Found a bug?
------------
Read the [Help I've Found a Bug](REPORTBUG.md) article and follow its instructions.


Want to know what are working on?
------------
Checkout our [vision](VISION.md).


Contributing
------------
We welcome pull requests from first-timers and seasoned veteran programmers alike. Follow the steps above to get setup.
Then have a look at some of the [projects issues](https://github.com/esfiddle/esfiddle/labels/up-for-grabs). After, please follow [these steps](CONTRIBUTE.md) to contribute.
