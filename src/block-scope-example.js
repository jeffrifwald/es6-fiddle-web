window.es6Example.blockScope = [
    'var x = 0;',
    '',
    'for (let i = 0; i < 10; i++) {',
    '    x += 10;',
    '}',
    '',
    'try {',
    '    console.log(i);',
    '} catch(e) {',
    '    console.log(',
    '        \'i does not exist here!\'',
    '    );',
    '}',
    ''
].join('\n');
