// makeProfileTimer

function makeProfileTimer(){
	var t0 = performance.now();
	return function(){
		var t1 = performance.now()
		return t1-t0;
	}
}

// makeSaver

function makeSaver(func){
	var x = func();
	function save(){
		return x 
	}
	return save;
}

//Final Countdown

 (function timer(i){
	setTimeout(function(){
		if(i != 0){
			console.log(i)
			i--
		}else{
			console.log("Поехали!")
			return;
		}
	return timer(i)
	},1000)
})(5)

//myBind

