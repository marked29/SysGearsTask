Submit_Button = document.getElementById("Submit");

var stepString = "";
var steps = 0;

function hanoiTowers(quantity, from, to, buf_peg)
{								
	if (quantity != 0)
	{
		hanoiTowers(quantity-1, from, buf_peg, to);
		steps++;
		stepString += "#"+quantity + " " + from + " -> " + to + "<br/>";

		hanoiTowers(quantity-1, buf_peg, to, from);
	}
}


function Reset() 
{
	alert("Steps: " + steps);
	steps = 0;
	stepString = "";
}


function updateHtml(some_info) 
{
	var markup = document.getElementById("Information");
	
	if (markup) {
		var informationDiv = document.getElementById("Information");
		informationDiv.innerHTML = "";
		informationDiv.innerHTML = some_info;
		Reset();
	}	
	else {
		var wrapper = document.createElement("div");
		wrapper.id = "Information";
		wrapper.innerHTML = some_info;
   		document.body.appendChild(wrapper);
		Reset();	
	}
}

Hanoi = function() {
	var Val = document.getElementById("Input").value;
	Val.trim();

	var digit = parseFloat(Val);
	if (digit > 8 || digit < 3) 
	{
		alert("Invalid value");
		return;
	}
	hanoiTowers(digit, "slot_a", "slot_c", "slot_b");
	updateHtml(stepString);
}


Submit_Button.addEventListener("click",Hanoi)