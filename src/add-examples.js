//add all of the example code to the example selector
for (var example in window.es6Example) {
    if (window.es6Example.hasOwnProperty(example)) {
        window.exampleSelector.innerHTML +=
            '<option value="' + example + '">' +
                window.es6Example[example].display +
            '</option>';
    }
}
