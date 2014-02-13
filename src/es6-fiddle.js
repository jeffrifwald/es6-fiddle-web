var fiddle = null,
    runBtn = document.querySelector('.run'),
    clearBtn = document.querySelector('.clear'),
    exampleSelector = document.querySelector('.examples'),
    iDoc = document.querySelector('.result').contentDocument,
    iBody = iDoc.body,
    iHead = iDoc.getElementsByTagName('head')[0],
    traceur = document.createElement('script'),
    logger = document.createElement('script'),
    userInput = null,
    bootstrap = null;

//set the global examples object
window.es6Example = {};

//add the fiddle area
fiddle = window.CodeMirror(document.querySelector('.fiddle'), {
    lineNumbers: true
});
fiddle.focus();

//add the logger script to the iframe
logger.innerHTML =
    'window.console.log = (function() {\n' +
    '\tvar log = console.log;\n' +
    '\treturn function() {\n' +
    '\t\tlog.apply(window.console, arguments);\n' +
    '\t\tdocument.body.innerHTML +=\n' +
    '\t\t\t"<div>" + \n' +
    '\t\t\t\tArray.prototype.slice.call(arguments).join(" ") + \n' +
    '\t\t"</div>";\n' +
    '\t};\n' +
    '})();\n\n';
iHead.appendChild(logger);

//set the iframe body style properties
iBody.style.fontFamily = 'monospace';

//wait for traceur to load
traceur.onload = function() {
    runBtn.onclick = function() {
        if (userInput) { //clean up the old code
            iHead.removeChild(userInput);
        }
        if (bootstrap) { //clean up the old code
            iHead.removeChild(bootstrap);
        }

        //create new script elements for the bootstrap and user input
        userInput = document.createElement('script');
        bootstrap = document.createElement('script');

        //user input needs to be a 'module' script for traceur
        userInput.setAttribute('type', 'module');

        //set the new script code
        userInput.innerHTML = fiddle.getValue();
        bootstrap.innerHTML =
            'document.body.innerHTML = "";\n' +
            'traceur.options.experimental = true;\n' +
            'new traceur.WebPageTranscoder(document.location.href).run();\n';

        //append the new scripts
        iHead.appendChild(userInput);
        iHead.appendChild(bootstrap);
    };

    //clear the 'console'
    clearBtn.onclick = function() {

    };

    //load the selected code
    exampleSelector.onchange = function() {
        if (exampleSelector.value) {
            fiddle.setValue(window.es6Example[exampleSelector.value]);
        }
    };
};

//add traceur to the iframe
traceur.src = 'lib/traceur/src/traceur.js';
iHead.appendChild(traceur);
