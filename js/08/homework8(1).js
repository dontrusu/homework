// sort

var persons = [
    {name: "Иван", age: 17},
    {name: "Мария", age: 35},
    {name: "Алексей", age: 73},
    {name: "Яков", age: 12},
]

function sorting(arr, fieldName, sortOrder = true){
	arr.sort(function (a, b){
		if(a[fieldName] > b[fieldName]){
				return sortOrder? 1 : -1;
		}
		return sortOrder? -1 : 1;
	})
return arr; 
}

//array map

var result  = array.map(function(value, index, arr){
		if(typeof(array[index]) == "string"){
			return parseInt(value);
		}else{
			return value;
		}
	}
)

// array reduce

function mult(a, b){
	if(typeof(a && b) == "number"){
		return a*b;
	}else{
		return a;
	}
}
var total = arr1.reduce(mult, 1)

// object filter

function filter(objectName, callback){
	for(var key in objectName){
		if(callback(key, objectName[key]) == false){
			delete objectName[key]
		}
	}
	return objectName
}

filter(phone,(key,value) => key == "color" || value == 2);

// object map

function map(obj, callback){
	var newObj = {};
	for(var key in obj){
		var callbackResult = callback(key, obj[key]);
		Object.assign(newObj, callbackResult)
	}
	return newObj;
}

