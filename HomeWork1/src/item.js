function buildItem(name, key, isLast) {
	let str = "";
	for (let i = 0; i < key - 1; i++){
		str = str + "   ";
	};

	if (!isLast){
		str = "│" + str.substring(1);
	};

	console.log(str + '└──' + name + "\n"); // console log
}

buildItem(JSON.parse("{ name: 2, items: [ { name: 3 }, { name: 4 } ] }"), 2, false);