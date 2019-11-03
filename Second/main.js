submitButton = document.getElementById("submit");

let stepString = "";
let steps = 0;

function hanoiTowers(quantity, from, to, buffer) {								
	if (quantity != 0) {
		hanoiTowers(quantity-1, from, buffer, to);
		steps++;
		stepString += "#" + quantity + " " + from + " -> " + to + "<br/>";
		hanoiTowers(quantity-1, buffer, to, from);
	}
}

function reset() {
	steps = 0;
	stepString = "";
}

function updateHtml(displayed_information) {
	const markup = document.getElementById("information");
	
	if (markup) {
		const informationDiv = document.getElementById("information");
		informationDiv.innerHTML = displayed_information;
		reset();
	} else {
		const wrapper = document.createElement("div");
		wrapper.id = "information";
		wrapper.innerHTML = displayed_information;
   		document.body.appendChild(wrapper);
		reset();	
	}
}

function main() {
	const val = document.getElementById("input").value.trim();

	const digit = parseFloat(val);
	if (digit > 8 || digit < 3) {
		alert("Invalid value");
		return;
	}

	hanoiTowers(digit, "slot_a", "slot_c", "slot_b");
	alert(steps);
	updateHtml(stepString);
}

submitButton.addEventListener("click", main)