const varToString = varObj => Object.keys(varObj)[0]

function saveNotif() {
	siiimpleToast.message("Game saved.", {
		position: "bottom right",
		margin: 10,
		delay: 0,
		duration: 5000
	});
}

function fullContainer() {
	siiimpleToast.alert("Your pollen container is full. Go to your hive to make honey.", {
		position: "bottom right",
		margin: 10,
		delay: 0,
		duration: 3000
	});
}

/*
function achievementGet(name, rewardMaterial, rewardAmount) {
	siiimpleToast.success("<h3>Achievement Reached</h3><br>" + name + "<br>You earned&nbsp;" + nFormatter(rewardAmount) + "&nbsp;" + varText(rewardMaterial), {
		position: "bottom right",
		margin: 10,
		delay: 0,
		duration: 5000
	});

	window[rewardMaterial] = window[rewardMaterial] + rewardAmount;

} */

/*   custom colors for background and font color

siiimpleToast
    .setOptions({position:'bottom|right', margin:10,duration:3000,style:{background: '#ffff00', color: '#000000'}})
    .message('Set options');

*/