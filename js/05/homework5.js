// 3 person, different fields

var a = {
	name: "Ivan",
	surname: "Ivanov",
	married: "yes",
	children: "yes",
}
var b = {
	name: "Petr",
	surname: "Petrov",
	fathername: "Petrovich",
	pets: "dog",
	}
var c = {
	name: "Yana",
	surname: "Yakovleva",
	age: "20",
	sex: "female",
}

//fields check

if("age" in a){
	alert(a.age);
}

if(typeof b.pets != "undefined"){
	alert(b.pets);
}

if("age" in c){
	alert(c.age);
}

//array of persons

var persons = [a, b, c, (d = {name: "Victor", surname: "Victorov",})]

// loop of persons

for(var i = 0; i<4; i++){
	console.log(persons[i]);
}

//loop of fields loop of persons