import $ from './helpers';

/*
  NOTE: when adding new editions, you will also
  need to add an entry for the exampleSelector
  in esfiddle/src/js/index.js
*/

const examples = {
  addExamples() {
    if (!window.embedded) {
      const el = $.getElement('.examples');
      const { es6Example, es7Example, es8Example } = window;

      // ES6 Add a divider between editions
      el.innerHTML += '<option disabled>----- ES6 Examples -----</option>';
      // Map over each Example and add an option to the select/dropdown list
      el.innerHTML += Object.keys(es6Example).map(
        example =>
          Object.prototype.hasOwnProperty.call(es6Example, example) &&
          `<option value="${example}">ES6 - ${es6Example[example].display}</option>`,
      );

      // ES7 Add a divider between editions
      el.innerHTML += '<option disabled>----- ES7 Examples -----</option>';
      // Map over each Example and add an option to the select/dropdown list
      el.innerHTML += Object.keys(es7Example).map(
        example =>
          Object.prototype.hasOwnProperty.call(es7Example, example) &&
          `<option value="${example}">ES7 - ${es7Example[example].display}</option>`,
      );

      // ES8 Add a divider between editions
      el.innerHTML += '<option disabled>----- ES8 Examples -----</option>';
      // Map over each Example and add an option to the select/dropdown list
      el.innerHTML += Object.keys(es8Example).map(
        example =>
          Object.prototype.hasOwnProperty.call(es8Example, example) &&
          `<option value="${example}">ES8 - ${es8Example[example].display}</option>`,
      );
    }
  },
};

module.exports = examples;
