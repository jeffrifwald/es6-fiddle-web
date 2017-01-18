//add all of the example code to the example selector

if (!window.embedded) {
    var example;
    
    for (example in window.es6Example) {
        if (window.es6Example.hasOwnProperty(example)) {
            window.exampleSelector.innerHTML +=
                '<option value="' + example + '">' +
                    window.es6Example[example].display +
                '</option>';
        }
    }

    if (window.es7ExamplesEnabled) {
        window.exampleSelector.innerHTML +=
            '<option disabled>ES7 Examples</option>';

        for (example in window.es7Example) {
            if (window.es7Example.hasOwnProperty(example)) {
                window.exampleSelector.innerHTML +=
                    '<option value="' + example + '">' +
                    window.es7Example[example].display +
                    '</option>';
            }
        }

    }
}
