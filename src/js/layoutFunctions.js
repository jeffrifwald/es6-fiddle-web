/* global localStorage document */
const layoutFunctions = {

  // Save the layout option specified to localStorage
  // Pass in a string either "vertical" or "horizontal" to save the layout
  saveLayoutOption(layoutType) {
    localStorage.setItem('es6fiddleLayout', layoutType);
  },

  // A method to change the width of the results and fiddle containers
  // Setting the width to 100% will make the fiddle box be on top and the results below
  setHorizontalStyle(codeWrapper) { codeWrapper.classList.add('column'); },

  // Called when we want to make the page back to its default vertical style
  // This will make the page have the fiddle on the left and the results on the right
  setVerticalStyle(codeWrapper) { codeWrapper.classList.remove('column'); },

  // Sets the styling for the results box with the given text and border color
  setResultsColors(textColor, borderColor) {
    const style = document.createElement('style'),
      iDoc = document.querySelector('.result').contentDocument,
      head = iDoc.getElementsByTagName('head')[0];
    style.innerHTML =
          `body{font-family:monospace;padding:10px;color:${textColor}; transition:color 0.5s;}
           div{border-bottom:1px solid ${borderColor};padding: 2px 0; transition:bottom-border 0.5s;}`;
    head.appendChild(style);
  },
};

module.exports = layoutFunctions;
