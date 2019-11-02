Submit_Button = document.getElementById("Submit");

function kelvinToFC(Kelvin) {
	let Fahrenheit = Kelvin * (9/5) - 459.67;
	let Celsius = Kelvin - 273.15;
	let result = [{'F':Fahrenheit.toPrecision(5)}, {'C': Celsius.toPrecision(5)}];

	return result;
}

function fahrenheitToKC(Fahrenheit) {
	let Kelvin = (Fahrenheit - 32) * (5/9) + 273.15;
	let Celsius = (Fahrenheit - 32) * (5/9);
	let result = [{'K':Kelvin.toPrecision(5)}, {'C': Celsius.toPrecision(5)}];

	return result
}

function celsiusToKF(Celsius) {
	let Kelvin = Celsius + 273.15	;
	let Fahrenheit = Celsius * 9/5 + 32;
	let result = [{'K':Kelvin.toPrecision(5)}, {'F': Fahrenheit.toPrecision(5)}];

	return result
}

const MAP_CONVERTOR = { 
						'K': kelvinToFC , 
						'F': fahrenheitToKC ,
						'C': celsiusToKF	
				  	  }

function main() {
	let Val = document.getElementById("Input").value;
	Val.trim();

	let digit = parseFloat(Val.slice(0, -1));
	const symbol = (Val[Val.length - 1]).toUpperCase();


	const result = MAP_CONVERTOR[symbol](digit) || "Invalid argument";
	const json = JSON.stringify(result);
	
	alert(json);
}

Submit_Button.addEventListener("click", main)
