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

for(var i = 0; i<persons.length; i++){
	console.log(persons[i]);
}

//loop of fields loop of persons

for(var key in persons){
	for(var names in persons[key]){
		if(names === "name" || names === "surname"){
			console.log(persons[key][names])
        }
	}
}

// loop of loop of keys

for(i = 0; i<persons.length; i++){
	var names = Object.keys(persons[i])
	for(j = 0; j<names.length; j++){
		if(names[j] === "name" || names[j] === "surname"){
			console.log(persons[i][names[j]])
        }
	}
}

//loop of loop with optional fields



//fullName

for(i=0;i<persons.length; i++){
	persons[i]["fullName"] = persons[i].name + " " + persons[i].surname
	if(persons[i].fathername !== undefined){
		persons[i]["fullName"] += " " + persons[i].fathername
	}
}

//serialize

var str = JSON.stringify(persons);

// deserialize

var e = {"name":"John","surname":"Cena","age":"41"};
persons[4] = e;

// HTML

