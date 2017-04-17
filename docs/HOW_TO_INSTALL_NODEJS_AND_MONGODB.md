How to install NodeJS and MongoDB
===
*These steps were created using a Windows 10 machine.*

### NodeJS
1) Visit https://nodejs.org/ to download and install the latest stable version.

### MongoDB
1) Visit https://www.mongodb.com/download-center?jmp=nav#community, select your operating system and install the latest community version.
2) In your Windows search bar type ```Environment Variables``` or go to the ```Control Panel > System & Security > System > Advanced System Settings > Environment Variables```, navigate to the ```Path``` variable hit ```Edit``` and add  your MongoDB path. (Ex. C:\Program Files\MongoDB\Server\3.4\bin)
3) Create ```\data\db``` folders somewhere on your drive. (Ex. C:\data\db)
4) Open an elevated command prompt and run ```mongod``` to make sure everything is installed correctly so far. The last line of the command prompt should say something like this:  
```2017-04-17T17:01:56.013-0500 I NETWORK  [thread1] waiting for connections on port 27017```
5) Now you can close out of the elevated command prompt, open Git Shell, and ```cd``` to esfiddle. While in this folder type ```mongod --dbpath path/to/your/db/folder``` (Ex. mongod --dbpath C:\data\db)
6) Go to ```C:\Users\YOUR_USERNAME_HERE\AppData\Roaming\npm``` and if you don't see grunt.cmd run ```npm install -g grunt-cli``` in a new elevated command prompt, and then close that command prompt.
7) Finally, go back into your esfiddle folder and run ```npm install```. 

Now whenever you want to start working on the project simply open the command prompt, type ```mongod```. Then open a second Git Shell, ```cd``` to esfiddle, and run ```npm start``` and you're ready to go!
