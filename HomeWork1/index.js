const fs = require('fs');

function buildItem(name, key, isLast) {
	let str = "";
	for (let i = 0; i < key - 1; i++){
		str = str + "   ";
	};

	if (!isLast){
		str = "│" + str.substring(1);
	};
	console.log(str + '└──' + name);
}

function buildTree(obj, key, isLast) {
	if (obj.hasOwnProperty('items')) {
		if (key == 0) {
			console.log(obj.name);
		} else if (key == 1) {
			exp = isLast ? '└──' : '├──';
			console.log(exp + obj.name);
		} else {
			buildItem(obj.name, key, isLast);
		}

		obj.items.forEach((element) => {
			return buildTree(element, key + 1, isLast);
		});
	} else {
		buildItem(obj.name, key, isLast);
	}
}

fs.readFile('tree.json', (err, text) => {
    const obj = JSON.parse(text);
	console.log(obj.name);
	obj.items.forEach((element, i, array) => {
		if (i == array.length - 1){ 
			buildTree(element, 1, true);
		} else {
			buildTree(element, 1, false);
		}
	});
})
