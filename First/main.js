Submit_Button = document.getElementById("Submit");

function kelvinToFC(Kelvin) {
	var Fahrenheit = Kelvin * (9/5) - 459.67;
	var Celsius = Kelvin - 273.15;
	var result = [{'F':Fahrenheit.toPrecision(5)}, {'C': Celsius.toPrecision(5)}];

	var json = JSON.stringify(result);
	
	alert(json);

}

function fahrenheitToKC(Fahrenheit) {
	var Kelvin = (Fahrenheit - 32) * (5/9) + 273.15;
	var Celsius = (Fahrenheit - 32) * (5/9);
	var result = [{'K':Kelvin.toPrecision(5)}, {'C': Celsius.toPrecision(5)}];

	var json = JSON.stringify(result);
	
	alert(json);
}

function celsiusToKF(Celsius) {
	var Kelvin = Celsius + 273.15	;
	var Fahrenheit = Celsius * 9/5 + 32;
	var result = [{'K':Kelvin.toPrecision(5)}, {'F': Fahrenheit.toPrecision(5)}];

	var obj = JSON.stringify(result);
	alert(obj);
}

Convertor = function() {
	var Val = document.getElementById("Input").value;
	Val.trim();

	var digit = parseFloat(Val.slice(0, -1));
	const symbol = (Val[Val.length - 1]).toUpperCase();

	switch (symbol) {
		case 'K':
			kelvinToFC(digit);
			break;
		
		case 'F':
			fahrenheitToKC(digit);
			break;
		
		case 'C':
			celsiusToKF(digit);
			break;
		
		default:
			alert("Invalid argument");
			break;
	}
			
}

Submit_Button.addEventListener("click",Convertor)
