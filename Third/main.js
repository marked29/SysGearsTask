submitButton = document.getElementById("submit");

let distance = 20;
let first_player_probability = 0;
let second_player_probability = 0;


function setUp() {
	first_player_probability = parseFloat(prompt("Set first player probability: "));	
	second_player_probability = parseFloat(prompt("Set second player probability: "));
}

function estimateProbabilityPerStep(currentProbability, steps) {
	return (1 - currentProbability) / steps;
}


function main() {
	
	setUp();

	if (first_player_probability < 0 || first_player_probability > 0.3) {
		alert("Invalid argument for player 1!");
		return;
	}

	if (second_player_probability < 0 || second_player_probability > 0.3) {
		alert("Invalid argument for player 2!");
		return;
	}

	const playersEstimationList = [
									estimateProbabilityPerStep(first_player_probability, distance),
									estimateProbabilityPerStep(second_player_probability, distance)
								];

	const playerNumber = parseInt(prompt("Pick players number (1-2): "));

	if (playerNumber == 1) {
		for (var i = 0; i <= distance - 1; i++) {
            if ((playersEstimationList[0] * i + first_player_probability) > (1 - playersEstimationList[1] * (i + 1) - second_player_probability)) {
	            alert("The optimal shot range is:" + i);
	            break;
            }
        }
	} else if (playerNumber == 2) {
		if (playersEstimationList[1] > 1 - playersEstimationList[0] - first_player_probability) {
                distance--;
                alert("The optimal shot range is: " + distance);
        } else {
        	for (var i = 0; i <= distance - 2; i++) {
                if ((playersEstimationList[0] * i) + first_player_probability > (1 - playersEstimationList[1] * (i + 2) - second_player_probability)) {
                    alert("The optimal shot range is: " + i);
                    break;
              	}
            }
        }
	} else {
		alert("Invalid player number");
	}
}

submitButton.addEventListener("click", main);