const fs = require('fs');


fs.readFile('tree.json', (err, text) => {
    let result = ''; 
    let tree = JSON.parse(text);
    
    result = tree.name + '\n';

     for (let i = 0; i < tree.items.length; i++) {
        result += '├──' + tree.items[i].name;

        for (let y = 0; y < tree.items[i].items.length; y++) {
            result += '\n' + '│';
            result += '  ├──' + tree.items[i].items[y].name;
        }

        result += '\n';
     };
     console.log(result);
});
