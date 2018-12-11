// html tree

var form = {
	tagName: "body",
	children: [
		{
			tagName: "div",
			children: [
				{
					tagName: "span",
					text: "Enter a data please:",
				},
				{
					tagName: "br/",
				},
				{
					tagName: "input",
					attrs: {
						type: "data",
						id: "name",
					},
				},
				{
					tagName: "input",
					attrs: {
						type: "text",
						id: "surname",
					},
				},
			]
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "button",
					attrs: {
						id: "ok",
						text: "OK",
					},
				},
				{
					tagName: "button",
					attrs: {
						id: "cancel",
						text: "Cancel",
					}
				},
			]
		}
	]
}

// declarative fields

var notebook = {
	brand: prompt("Enter a brand"),
	type: prompt("Enter a type"),
	model: prompt("Enter a model"),
	ram: +prompt("Enter a RAM"),
	size: prompt("Enter a size"),
	weght: +prompt("Enter a weight"),
	resolution: {
		width: +prompt("Enter a width"),
		height: +prompt("Enter a hight"),
	},
};

var phone = {
	brand: prompt("Enter a brand"),
	model: prompt("Enter a model"),
	ram: +prompt("Enter a RAM"),
	color: prompt("Enter a color"),
};

var person = {
	name: prompt("Enter a name"),
	surname: prompt("Enter a surname"),
	married: confirm("Are you maried?"),
};

//object links

person["smartfone"] = phone;
person["laptop"] = notebook;

notebook["owner"] = person;

phone["owner"] = person;

//imperative array fill 3

var arr = [];

arr[0] = prompt("first element");
arr[1] = prompt("second element");
arr[2] = prompt("third element");

//while confirm 

var choice 
while (choice != true){
	choice = confirm("");
}

//array fill

var arr = [];
while(element !== null){
	var element = prompt("add element to array");
	if(element !== null){
		arr.push(element);
    }
}

//array fill nopush

var arr = [];
for(var i = 0; element !== null; i++){
	var element = prompt("add element to array");
	if (element !== null){
        arr[i] = element;
    }
}

//infinity probability

for(var i = 1; i>0; i++){
	var a = Math.random();
	if(a > 0.9){
		break;
	}
}
alert(i);

// empty loop

for (var a; a != "" || a != true && a === null; a = prompt()){
}

// progression sum

var x = 1;
var n = +prompt("До какого члена прогрессии считать?")
for(var i = 1; i <= n; i++){
	x = x+3;
}
console.log(x-3);

// chess one line

var str = " ";
for(var a = 1; a<=5; a++){
	str += "# ";
}
console.log(str);

//numbers

var str = "";
for (var i=0;i<10;i++){
	str+= "\n"
	for (j=0;j<10;j++){
		str += j;
	}
}
console.log(str);

// chess

var board = "";
for(var row = 0; row <= 10; row++){
	board += "\n";
	for(var column = 0; column <= 11; column++){
		if(column % 2 == row % 2){
			board += ".";
		}else{
				board += "#";
			}
	}
}
console.log(board);

//cubes

var arr = [];
var n = prompt("Сколько элементов в массиве?");
for(var i = 0; i<n; i++){
	arr[i] = i*i*i;
}
console.log(arr);

// multiply table

var arr = [];
for(var i = 0; i<10; i++){
	arr[i] = [];
	for(var n = 0; n<10; n++){
		arr[i][n] = n*i;
	}
}

// matrix to html table

var str = "<table border = 1>"
var arr = [];
for(var i = 0; i<10; i++){
	str += `<tr>${arr[i] = []}</tr>`
	for(var n = 0; n<10; n++){
		str += `<td>${arr[i][n] = n*i}</td>`
	}
}
str += "</table>"
