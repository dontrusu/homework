var div = document.createElement("div");
container.appendChild(div);
calc.onclick = function(){
	var weekResult = (cigarette.value)*0.25+(alcohol.value)*6;
	var yearResult = weekResult*52/24;
	div.innerText = `За неделю уходит ${weekResult} часа. А за год ${yearResult.toFixed(2)} дня`
}