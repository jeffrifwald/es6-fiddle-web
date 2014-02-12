window.es6Example.rest = [
    'function format(str, ...args) {',
    '    return str.replace(/\\{\\s*(\\d+)\\s*\\}/g, function(m, n) {',
    '        return args[n];',
    '    });',
    '}',
    '',
    'let msg = format(',
    '    \'The {0}st arg is a string, the {1} are not.\',',
    '    1,',
    '    \'rest\'',
    ');',
    '',
    'console.log(msg);',
    ''
].join('\n');
