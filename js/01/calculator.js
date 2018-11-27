var cigarette = +prompt("сколько сигарет куришь в день?", 0);
var alcohol = +prompt("сколько литров пивка в неделю пьешь?", 0);

var weekResult = cigarette*0.25+alcohol*6;
var yearResult = weekResult*52/24;

alert(`За неделю уходит ${weekResult} часа. А за год ${yearResult.toFixed(2)} дня`);
