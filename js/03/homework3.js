//##switch: sizes

var type = prompt("Размер чего вы бы хотели узнать:\n\верхняя одежда\n\женское белье\n\чулки и носки\n\r")
switch(type){
  case "верхняя одежда" : 
    var sizeRUSclothes = prompt("Введите размер");
  if(sizeRUSclothes >= 40 && sizeRUSclothes <= 54){
    var sizeUSAclothes = sizeRUSclothes - 32;
    alert(`Ваш размер: ${sizeUSAclothes} `);
  }else{
    alert("Слишком маленький либо слишком большой размер");
  }
   break;
  case "женское белье" : 
    var sizeRUSunderwear = prompt("Введите размер");
    if(sizeRUSunderwear >= 42 && sizeRUSunderwear <= 56){
      var sizeUSAunderwear = sizeRUSunderwear - 34;
      alert(`Ваш размер: ${sizeUSAunderwear} `);
    }else{
      alert("Слишком маленький либо слишком большой размер");
    }
    break;
  case "чулки и носки" : 
    var sizeRUSsocks = prompt("Введите размер");
      if(sizeRUSsocks >= 21 && sizeRUSsocks <= 27){
        var sizeUSAsocks = (sizeRUSsocks - 5)/2 ;
        alert(`Ваш размер: ${sizeUSAsocks} `);
      }else{
        alert("Слишком маленький либо слишком большой размер");
      }
    break;
  default: alert("Пока");
    break;
}

//## switch: if

var color = prompt("Введите цвет", "");
if(color == "red" || color == "black"){
  document.write("<div style='background-color: red;'>красный</div>");
  document.write("<div style='background-color: black; color: white;'>черный</div>");  
}else{ 
  if(color == "blue" || color == "green"){
  document.write("<div style='background-color: blue;'>синий</div>");
  document.write("<div style='background-color: green;'>зеленый</div>");
  }else{
    document.write("<div style='background-color: gray;'>Я не понял</div>");
  }
}

//##prompt: or

var yourAge = +prompt("Ваш возраст", "") || alert("Введите возраст");
var curentDate = new Date();
var date = curentDate.getFullYear();
var year = date- yourAge;
alert(`Ваш год рождения: ${year}`);

//##prompt: or this days

var a = confirm("шопинг?") || alert("ты = бяка");

//confirm: if this days

var a = confirm("Шопинг?");
if(a == false){
  alert("ты - бяка");
}

//triple prompt

var a = prompt("Ваша фамилия:");
var b = prompt("Ваше имя:");
var c = prompt("Ваше отчество:");
alert(`${a} ${b} ${c}`);

//default: or

var a = prompt("Ваша фамилия:") || "Иванов";
var b = prompt("Ваше имя:") || "Иван";
var c = prompt("Ваше отчество:") || "Иванович";
alert(`${a} ${b} ${c}`);

//default: if

var a = prompt("Ваша фамилия:");
if(a == null){
  a = "Иванов";
}
var b = prompt("Ваше имя:");
if(b == null){
  b = "Иван";
}
var c = prompt("Ваше отчество:");
if(c == null){
  c = "Иванович";
}
alert(`${a} ${b} ${c}`);

//login and password

var log = prompt("Введите логин");
if(log === "admin"){
  var pass = prompt("Введите пароль");
  if(pass === "qwerty"){
    alert("Авторизация успешна");
  }else{
    if(pass!== "qwerty"){
    alert("Неверный пароль");
    }
  }
}else{
  if(log !== "admin"){
  alert("Неверный логин");
  }
}

//currency calc

var currency = prompt("На какую валюту хотите поменять, usd или eur?");
switch (currency){
  case "usd": var course = 28.15;
    break;
  case "eur": var course = 32.05;
    break;
  default: alert("Валюта не выбрана");  
}
var uah = prompt("Сколько гривен хотите поменять?");
alert(`Вы получите ${uah/course} ${currency}`);

//currency calc: improved

var currency = prompt("На какую валюту хотите поменять, usd или eur?");
currency = currency.toLowerCase()
switch (currency){
  case "usd": var course = 28.15;
    break;
  case "eur": var course = 32.05;
    break;
  default: alert("Валюта не выбрана");  
}
var uah = prompt("Сколько гривен хотите поменять?");
alert(`Вы получите ${uah/course} ${currency}`);

//currency calc: two rates

var currency = prompt("На какую валюту хотите поменять, usd или eur?");
currency = currency.toLowerCase()
var sale = confirm("Хотите ли вы продать валюту?");
var course;
switch (currency){
  case "usd": (sale) ? course = 27.90 : course = 28.15;
    break;
  case "eur": (sale) ? course = 31.60 : course = 32.05;
    break;
  default: alert("Валюта не выбрана");  
}
var exchange = prompt("Сколько хотите поменять?");
(sale) ? alert(`Вы получите ${exchange*course} uah`) : alert(`Вы получите ${exchange/course} ${currency}`);

//currency calc: if

var currency = prompt("На какую валюту хотите поменять, usd или eur?");
currency = currency.toLowerCase();
var sale = confirm("Хотите ли вы продать валюту?");
if(currency == "usd"){
  (sale) ? course = 27.90 : course = 28.15;
}else{
  if(currency == "eur"){
   (sale) ? course = 31.60 : course = 32.05; 
  }else{
  alert("Валюта не выбрана");
  }
}
var exchange = prompt("Сколько хотите поменять?");
(sale) ? alert(`Вы получите ${exchange*course} uah`) : alert(`Вы получите ${exchange/course} ${currency}`);

//scissors

var user = prompt("камень, ножницы, бумага");
var computer = Math.random();
if(computer <= 0.33){
  var sign = "камень";
  alert(sign);
}else{
  if(computer <= 0.66){
  var sign = "бумага";
  alert(sign);
  }else{
    if(computer <= 0.99){
    var sign = "ножницы";
    alert(sign);
    }
  }
}
switch(user) {
  case "камень" : if(sign == "бумага"){
    alert("Ты проиграл");
  }else{
    if(sign == "ножницы"){
      alert("Ты победил");
    }else{
      alert("Ничья")
    }
  }break;
  case "ножницы" : if(sign == "бумага"){
    alert("Ты победил");
  }else{
    if(sign == "ножницы"){
      alert("Ничья");
    }else{
      alert("Ты проиграл")
    }
  }break;
  case "бумага" : if(sign == "бумага"){
    alert("Ничья");
  }else{
    if(sign == "ножницы"){
      alert("Ты проиграл");
    }else{
      alert("Ты победил")
    }
  }break;  
}

//Задание на синий пояс

var currency = prompt("С какой валютой вы хотите проводить операции, usd или eur?");
currency = currency.toLowerCase();
var operation = prompt("Вы хотите купить или продать?")
operation = operation.toLowerCase();
var usd = {
  sale: 27.90,
  buy: 28.15
}
var eur = {
  sale: 31.60,
  buy: 32.05
}
var quantity;
if(currency === "usd" && operation === "купить"){
  quantity = +prompt("Сколько вы хотите купить?");
  alert(`Вам нужно ${quantity*usd["buy"]} гривен`);
}else{
  if(currency === "usd" && operation === "продать"){;
  quantity = +prompt("Сколько вы хотите продать?");
  alert(`Вы получите ${quantity*usd["sale"]} гривен`);
  }
}  
if(currency === "eur" && operation === "купить"){
  quantity = +prompt("Сколько вы хотите купить?");
  alert(`Вам нужно ${quantity*eur["buy"]} гривен`);
}else{
  if(currency === "eur" && operation === "продать"){;
  quantity = +prompt("Сколько вы хотите продать?");
  alert(`Вы получите ${quantity*eur["sale"]} гривен`);
  }                                                    
}


