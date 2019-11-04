submitButton = document.getElementById("submit");

let stepString = "";
let steps = 0;

// label the pegs A, B, C,
// let n be the total number of disks,
// number the disks from 1 (smallest, topmost) to n (largest, bottom-most).

//Assuming all n disks are distributed in valid arrangements among the pegs;
//assuming there are m top disks on a source peg, and all the rest of the disks are larger than m, so they can be safely ignored; 
//to move m disks from a source peg to a target peg using a spare peg, without violating the rules:

// 1. Move m − 1 disks from the source to the spare peg, by the same general solving procedure. Rules are not violated, by assumption. 
// 		This leaves the disk m as a top disk on the source peg.
// 2. Move the disk m from the source to the target peg, which is guaranteed to be a valid move, by the assumptions — a simple step.
// 3. Move the m − 1 disks that we have just placed on the spare, from the spare to the target peg by the same general solving procedure, 
// 		so they are placed on top of the disk m without violating the rules
// 4. The base case being to move 0 disks (in steps 1 and 3), that is, do nothing – which obviously doesn't violate the rules.
// The full Tower of Hanoi solution then consists of moving n disks from the source peg A to the target peg C, using B as the spare peg.

function hanoiTowers(quantity, from, to, buffer) {								
	if (quantity != 0) {
		hanoiTowers(quantity-1, from, buffer, to);
		steps++;
		stepString += "#" + quantity + " " + from + " -> " + to + "<br/>";
		hanoiTowers(quantity-1, buffer, to, from);
	}
}

// Reset information to keep ot clean from the previous results
function reset() {
	steps = 0;
	stepString = "";
}

// Check if we have already added "information"-div and update it
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