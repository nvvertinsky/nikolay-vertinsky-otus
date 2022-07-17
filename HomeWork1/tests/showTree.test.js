const tree = require("../src/index.js");
const fs = require("node:fs");
const path = require("node:path");

const expectedShowTree = "1\n├──2\n│  └──3\n│  └──4\n└──5\n   └──6\n";
const expectedBuildItem = "│  └──3" + "\n";
const expectedBuildTree = "└──3\n";


test("Отображение всего дерева", () => {
    expect(tree.showTree().then(data => {
        expect(data).toBe(expectedShowTree)
    }));
});

test("Отображение одного элемента дерева", () => {
    expect(tree.buildItem("3", 2, false)).toBe(expectedBuildItem);
});

test("Отображение группы элементов дерева", () => {
    let obj = JSON.parse(`{ "name": 2, "items": [ { "name": 3 }] }`);

    obj.items.forEach((element, i, array) => {
        expect(tree.buildTree(element, 1, true)).toBe(expectedBuildTree);
    });
});