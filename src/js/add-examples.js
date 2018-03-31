import $ from './helpers';

/*
  NOTE: when adding new editions, you will also
  need to add an entry for the exampleSelector
  in esfiddle/src/js/index.js
  TODO: Move edition info into config file
  so we can use it in other places too.
*/

const examples = {
  addExamples() {
    if (!window.embedded) {
      const el = $.getElement('.examples');
      const { es6Example, es7Example, es8Example } = window;

      const editionInfo = {
        es6: {
          name: 'ES2015',
          example: es6Example,
        },
        es7: {
          name: 'ES2016',
          example: es7Example,
        },
        es8: {
          name: 'ES2017',
          example: es8Example,
        },
      };

      Object.entries(editionInfo).map(([key, value]) => {
        const shortName = key.toUpperCase();
        // Add a divider between editions
        el.innerHTML += `<option disabled>--- ${value.name} (${shortName}) Examples ---</option>`;
        // Map over each Example and add an option to the select/dropdown list
        el.innerHTML += Object.keys(value.example).map(
          example =>
            Object.prototype.hasOwnProperty.call(value.example, example) &&
            `<option value="${example}"> ${value.example[example].display}</option>`,
        );
        return undefined;
      });
    }
  },
};

module.exports = examples;
