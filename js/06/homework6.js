// a

function a(a){
    alert(a)
}
a("Привет!") // вызывает alert("Привет!")


//cube

function cube(i){
    return Math.pow(i, 3)
}

// avg2

function avg2(a = 0, b = 0){
    return (a + b)/2;
}
avg2(1,2) // возвращает 1.5
avg2(10,5) // возвращает 7.5

// sum3

function sum3(a = 0, b = 0, c = 0){
    return a+b+c;
}
sum3(1,2,3) // => 6
sum3(5,10,100500) // => 100515
sum3(5,10) // => 15

// intRandom

function intRandom(a = 0, b = 0){
    var c = a -0.5 + Math.random() * (b - a + 1);
    c = Math.round(c);
    return c;
}
intRandom(2,15) // возвращает целое случайное число от 2 до 15 (включительно)
intRandom(-1,-1) // вернет -1
intRandom(0,1) // вернет 0 или 1
intRandom(10) // вернет 0 до 10 включительно

// greetAll

function greetAll(){
	var name = "";
    for(var i = 0; i<arguments.length; i++){
        name += arguments[i] + ", ";
    }
	alert(`Hello ${name} `);
}
greetAll("Superman") // выводит alert "Hello Superman"
greetAll("Superman", "SpiderMan") // выводит alert "Hello Superman, SpiderMan"
greetAll("Superman", "SpiderMan", "Captain Obvious") // выводит alert "Hello Superman, SpiderMan, Captain Obvious"

// sum

function sum(){
    var plus = 0;
    for(var i = 0; i<arguments.length; i++){
        plus += arguments[i];
    }
    return plus;
}
sum(1) // => 1
sum(2) // => 2
sum(10,20,40,100) // => 170

// Union

function a(a){
    alert(a)
}

function cube(i){
    return Math.pow(i, 3)
}

function avg2(a, b){
    return (a + b)/2;
}

function sum3(a = 0, b = 0, c = 0){
    return a+b+c;
}

function intRandom(a = 0, b = 0){
    var c = a -0.5 + Math.random() * (b - a + 1);
    c = Math.round(c);
    return c;
}

function greetAll(){
	var name = "";
    for(i = 0; i<arguments.length; i++){
        name += arguments[i] + ", ";
    }
	alert(`Hello ${name} `);
}

function sum(){
    var plus = 0;
    for(i = 0; i<arguments.length; i++){
        plus += arguments[i];
    }
    return plus;
}

var sample = prompt("Введите название задания");
switch (sample.toLowerCase()){
	case "a": a("Hello")
		break
	case "cube": cube(4)
		break
	case "avg2": avg2(5, 6)
		break
	case "sum3": sum3(3, 5, 7)
		break
	case "intRandom": intRandom(2, 10)
		break
	case "greetAll": greetAll("Superman", "SpiderMan")
		break
	case "sum": sum(2, 5, 8)
		break					
}
// Union declarative

var union = {
	a: a(),
	cube: cube(),
	avg2: avg2(),
	sum3: sum3(),
	intRandom: intRandom(),
	greetAll: greetAll(),
	sum3: sum3(),
}