multiplication.style.textAlign = "center";
var tr = document.createElement("tr");
for(var i = 1; i<10; i++){
	tr = document.createElement("tr");	
	multiplication.appendChild(tr);
	if(i % 2 == 0){
		tr.style.backgroundColor="#f6f6ee"
	}
	for(var j = 1; j<10; j++){
		var td = document.createElement("td");
		tr.appendChild(td);
		td.innerText = i*j;
		td.style.border = "1px solid black"
		td.style.width = "40px"
		td.style.height = "40px"
		td.onmouseover = function(event) {
 			event.target.style.background = "#ffcccc";
 			//this.parentElement.style.backgroundColor = "#ffcccc";
		}
		td.onmouseout = function(event) {
	  		event.target.style.background = "";
	  		//this.parentElement.style.backgroundColor = "";
  	}

	}
}
