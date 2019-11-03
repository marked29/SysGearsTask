const submitButton = document.getElementById("submit");

function kelvinToFC(kelvin) {
	const fahrenheit = kelvin * (9/5) - 459.67;
	const celsius = kelvin - 273.15;
	const result = [{'F':fahrenheit.toPrecision(5)}, {'C': celsius.toPrecision(5)}];

	return result;
}

function fahrenheitToKC(fahrenheit) {
	const kelvin = (fahrenheit - 32) * (5/9) + 273.15;
	const celsius = (fahrenheit - 32) * (5/9);
	const result = [{'K':kelvin.toPrecision(5)}, {'C': celsius.toPrecision(5)}];

	return result
}

function celsiusToKF(celsius) {
	const kelvin = celsius + 273.15	;
	const fahrenheit = celsius * 9/5 + 32;
	const result = [{'K':kelvin.toPrecision(5)}, {'F': fahrenheit.toPrecision(5)}];

	return result
}

const MAP_CONVERTOR = { 
						'K': kelvinToFC ,
						'F': fahrenheitToKC ,
						'C': celsiusToKF
					}

function main() {
	const val = document.getElementById("input").value;
	val.trim();

	const digit = parseFloat(val.slice(0, -1));
	const symbol = (val[val.length - 1]).toUpperCase();

	const result = MAP_CONVERTOR[symbol](digit) || "Invalid argument";
	const json = JSON.stringify(result);
	
	alert(json);
}

submitButton.addEventListener("click", main)
