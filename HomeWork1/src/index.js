const fs = require("node:fs");

function buildItem(name, key, isLast) {
	let str = "";
	for (let i = 0; i < key - 1; i++){
		str = str + "   ";
	};

	if (!isLast){
		str = "│" + str.substring(1);
	};

	return str + '└──' + name + "\n"; // console log
}

function buildTree(obj, key, isLast) {
	let result = "";

	if (obj.hasOwnProperty('items')) {
		if (key == 0) {
			result += obj.name + "\n"; // console log
		} else if (key == 1) {
			exp = isLast ? '└──' : '├──';
			result += exp + obj.name + "\n"; // console log
		} else {
			result += buildItem(obj.name, key, isLast);
		}

		obj.items.forEach((element) => {
			result += buildTree(element, key + 1, isLast); // return
		});
	} else {
		result += buildItem(obj.name, key, isLast);
	}

	return result;
}

function showTree() {
	return new Promise(resolve => {
		let result = "";
		
		fs.readFile('./tree.json', (err, text) => {
			const obj = JSON.parse(text);
			result = obj.name + "\n"; //console.log
	
			obj.items.forEach((element, i, array) => {
				if (i == array.length - 1){ 
					result += buildTree(element, 1, true);
				} else {
					result += buildTree(element, 1, false);
				};
			});

			resolve(result);
		});
	})
};


//showTree().then((data) => console.log(data));

module.exports = {buildItem, buildTree, showTree };