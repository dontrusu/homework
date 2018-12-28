// a

var a = a => alert(a);
a("Привет!");

//cube

var cube = i => Math.pow(i, 3);

// avg2

var avg2 = (a = 0, b = 0) => (a + b)/2;
avg2(1,2) // возвращает 1.5
avg2(10,5) // возвращает 7.5

// sum3

var sum3 = (a = 0, b = 0, c = 0) => a + b +c
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
