import $ from './helpers';

const examples = {
  addExamples(EditionInfo) {
    if (!window.embedded) {
      const el = $.getElement('.examples');
      Object.entries(EditionInfo).map(([key, value]) => {
        const shortName = key.toUpperCase();
        // Add a divider between editions
        el.innerHTML += `<option disabled>--- ${value.name} (${shortName}) Examples ---</option>`;
        // Map over each Example and add an option to the select/dropdown list
        el.innerHTML += Object.keys(window[value.example]).map(
          example =>
            Object.prototype.hasOwnProperty.call(window[value.example], example) &&
            `<option value="${example}"> ${window[value.example][example].display}</option>`,
        );
        return undefined;
      });
    }
  },
};

module.exports = examples;
