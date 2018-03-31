/* global window */
window.es8Example = window.es8Example || {};
window.es8Example.objectEntriesValues = {};

window.es8Example.objectEntriesValues.code = `
const inventory = {
  books: 5,
  eraser: 10,
  pencils: 15,
  notepads: 20,
};

/* 
  Object.values
  Return the total inventory count
*/

const total = Object.values(inventory).reduce((a, b) => a + b);
console.log('Total: ', total);


/* 
  Object.entries
  Return both key and value from inventory
*/

// Option 1 - Destructuring as it comes into the function
Object.entries(inventory).forEach(([key, value]) => {
  console.log('Key/Value: ', key, value);
});

// Option 2 - Destructuring inside the function
Object.entries(inventory).forEach((pair) => {
  const [key, value] = pair;
  console.log('Key/Value: ', key, value);
});
`;

window.es8Example.objectEntriesValues.display = 'Object Entries & Values';
