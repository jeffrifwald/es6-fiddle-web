/* global window */
window.es8Example = window.es8Example || {};
window.es8Example.stringPadStartEnd = {};

window.es8Example.stringPadStartEnd.code = `/* 
The padStart() and padEnd() methods pad the given string 
on the left (start) or right (end) so that the resulting 
string reaches the given length.

Syntax

  str.padStart(targetLength [, padString])
  str.padEnd(targetLength [, padString])

The default value of padString is " ".

*/ 

const string = 'esfiddle';

/*
  with a value of 10, padStart will add 3 "⎵" to the begining of 
  the string "esfiddle" because its length is already 8. 
*/ 
const start = string.padStart(10, '⎵');
const end = string.padEnd(10, '⎵');

console.log('padStart:', start);
console.log('padEnd:', end);

`;

window.es8Example.stringPadStartEnd.display = 'String padStart padEnd';
