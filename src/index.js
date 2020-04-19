import './scss/main.scss';

// CONSTANTS AND GLOBAL VARIABLES
const JSONFILE = './src/data/player-stats.json';
var myObj, logoX, logoY;;
var xmlhttp = new XMLHttpRequest();
var url = './src/data/player-stats.json';

// LOAD THE JSON DATA
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
	setupPage(myObj); // Run function to set up page
	buildCard(4916, myObj); // Run function to show a player on page load (4916 is a hard-coded player ID)
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

// SET UP PAGE ON PAGE LOAD
function setupPage(listData){
	let dropdown = document.getElementById('player-dropdown');
	dropdown.length = 0;
	let defaultOption = document.createElement('option');
	defaultOption.text = 'Select a player...';
	dropdown.add(defaultOption);
	dropdown.selectedIndex = 0;
	let option;
	for(let i = 0; i < listData.players.length; i++){
		// Build dropdown options
		option = document.createElement('option');
		option.text = `${listData.players[i].player.name.first} ${listData.players[i].player.name.last}`;
		option.value = listData.players[i].player.id;
		dropdown.add(option);
	};
};

// FUNCTION TO GET THE SPRITE CO-ORDINATES FOR THE CLUB LOGOS
function getClubLogo(selectedClubId){
	switch (selectedClubId) {
		case 21: // Tottenham Hotspur
        	logoX = 500;
        	logoY = 1000;
			break;
		case 11: // Man City
        	logoX = 800;
        	logoY = 700;
			break;
		case 12: // Man Utd
        	logoX = 600;
        	logoY = 800;
			break;
		case 1: // Arsenal
        	logoX = 100;
        	logoY = 100;
			break;
		case 26: // Leicester
        	logoX = 0;
        	logoY = 0;
			break;
		default: // Blank part of sprite (so won't show any logo)
			logoX = 1100;
        	logoY = 600;
		}
}

// BUILD THE CARD DATA (RUNS ON PAGE LOAD AND WHEN DROPDOWN MENU CHANGED)
function buildCard(selectedPlayerId, playersData){
	var thisSelectedPlayerId = selectedPlayerId;
	var selectedPlayer;
	for(var j = 0; j < playersData.players.length; j++){
		if(playersData.players[j].player.id == thisSelectedPlayerId){
			selectedPlayer = playersData.players[j];
			break;
		}
	}
	// Gets & sets the logo sprite co-ordinates
	getClubLogo(selectedPlayer.player.currentTeam.id);
	document.querySelector('#player-card-logo-icon').setAttribute("style", `background-position: -${logoX}px -${logoY}px`);
	// Sets the player image SRC and alt tag
	document.querySelector('#player-card-img').setAttribute("src", `src/img/p${selectedPlayer.player.id}.png`);
	document.querySelector('#player-card-img').setAttribute("alt", `${selectedPlayer.player.name.first} ${selectedPlayer.player.name.last}`);
	// Sets player name & position
	document.querySelector('#player-card-name').innerHTML = `${selectedPlayer.player.name.first} ${selectedPlayer.player.name.last}`;
	document.querySelector('#player-card-position').innerHTML = `${selectedPlayer.player.info.positionInfo}`;
	// These run the search() function as they need to loop through a nested array (and look for the name (e.g. "appearances")) within the JSON data
	document.querySelector('#player-card-appearances').innerHTML = `${search("appearances", selectedPlayer.stats)}`;
	document.querySelector('#player-card-goals').innerHTML = `${search("goals", selectedPlayer.stats)}`;
	document.querySelector('#player-card-assists').innerHTML = `${search("goal_assist", selectedPlayer.stats)}`;
	// These also run the search() function, but in addition A: need to run a calculation to get the value to display, and B: need to be rounded to 1 decimal
	document.querySelector('#player-card-goals-per-match').innerHTML = `${Math.round((search("goals", selectedPlayer.stats) / search("appearances", selectedPlayer.stats))* 10) / 10}`;
	document.querySelector('#player-card-passes').innerHTML = `${Math.round(((search("fwd_pass", selectedPlayer.stats)+search("backward_pass", selectedPlayer.stats)) / search("mins_played", selectedPlayer.stats))* 10) / 10}`;
}

// WHEN THE DROPDOWN MENU IS CHANGED, GET THE NEW PLAYER ID AND BUILD THE NEW CARD
document.querySelector("#player-dropdown").onchange = function (){
	var selectedSortType = document.querySelector("#player-dropdown").value;
	buildCard(selectedSortType, myObj);
}

// GET STATISTICAL VALUES (E.G. GOALS, APPEARANCES, ETC) FROM THE NESTED ARRAY IN THE JSON DATA
function search(getStatKey, statArray){
	var returnedValue;
	// Loop through array to look for the name, and return the corresponding value
	for (var i=0; i < statArray.length; i++) {
        if (statArray[i].name === getStatKey) {
			returnedValue = statArray[i].value;
		}
	}
	// Add in a value if data does not exist (assumed to be 0)
	if(returnedValue == undefined){
		returnedValue = 0;
	}
	return returnedValue;
}
