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

	if (first_player_probability < 0.1 || first_player_probability > 0.3) {
		alert("Invalid argument for player 1! Use values from range (0.1 - 0.3)");
		return;
	}

	if (second_player_probability < 0.1 || second_player_probability > 0.3) {
		alert("Invalid argument for player 2! Use values from range (0.1 - 0.3)");
		return;
	}

	// Get estimation of probability per step. 
	const playersEstimationList = [
									estimateProbabilityPerStep(first_player_probability, distance),
									estimateProbabilityPerStep(second_player_probability, distance)
								];

	const playerNumber = parseInt(prompt("Pick players number (1-2): "));

	// if we pick player #1 then we compare chances-per-step with player#2 chances and when we get better chance we shoot
	if (playerNumber == 1) {
		for (var i = 0; i <= distance - 1; i++) {
            if ((playersEstimationList[0] * i + first_player_probability) > (1 - playersEstimationList[1] * (i + 1) - second_player_probability)) {
	            alert("The optimal shot range is:" + i);
	            break;
            }
        }
	} else if (playerNumber == 2) {
		// Check if it is profitable to shoot from the first step 
		if (playersEstimationList[1] > 1 - playersEstimationList[0] - first_player_probability) {
                distance--;
                alert("The optimal shot range is: " + distance);
        } else {
        	// the same as we did for player one but one step less
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