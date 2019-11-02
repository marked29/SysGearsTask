const submitButton = document.getElementById("Submit");

function kelvinToFC(Kelvin) {
	const Fahrenheit = Kelvin * (9/5) - 459.67;
	const Celsius = Kelvin - 273.15;
	const result = [{'F':Fahrenheit.toPrecision(5)}, {'C': Celsius.toPrecision(5)}];

	return result;
}

function fahrenheitToKC(Fahrenheit) {
	const Kelvin = (Fahrenheit - 32) * (5/9) + 273.15;
	const Celsius = (Fahrenheit - 32) * (5/9);
	const result = [{'K':Kelvin.toPrecision(5)}, {'C': Celsius.toPrecision(5)}];

	return result
}

function celsiusToKF(Celsius) {
	const Kelvin = Celsius + 273.15	;
	const Fahrenheit = Celsius * 9/5 + 32;
	const result = [{'K':Kelvin.toPrecision(5)}, {'F': Fahrenheit.toPrecision(5)}];

	return result
}

const MAP_CONVERTOR = { 
						'K': kelvinToFC , 
						'F': fahrenheitToKC ,
						'C': celsiusToKF	
				  	  }

function main() {
	const Val = document.getElementById("Input").value;
	Val.trim();

	const digit = parseFloat(Val.slice(0, -1));
	const symbol = (Val[Val.length - 1]).toUpperCase();


	const result = MAP_CONVERTOR[symbol](digit) || "Invalid argument";
	const json = JSON.stringify(result);
	
	alert(json);
}

submitButton.addEventListener("click", main)
