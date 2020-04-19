import './scss/main.scss';

// import JSON file
const JSONFILE = './src/data/player-stats.json';
var myObj;

// var getJSON = function(url) {
//   return new Promise(function(resolve, reject) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('get', url, true);
//     xhr.responseType = 'json';
//     xhr.onload = function() {
//       var status = xhr.status;
//       if (status == 200) {
//         resolve(xhr.response);
//       } else {
//         reject(status);
//       }
//     };
//     xhr.send();
//   });
// };
// getJSON(JSONFILE).then(function(data) {
// // Build dropdown list when page loads for first time
//     myObj = data;
// 	setupPage(myObj);
// 	buildCard(4916, myObj); // ID added so a player shows on page load
// }, function(status) { //error detection
//   console.log('Something went wrong.');
// });

var xmlhttp = new XMLHttpRequest();
var url = './src/data/player-stats.json';

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
	//myObj = data;
	setupPage(myObj);
	buildCard(4916, myObj); // ID added so a player shows on page load
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();


function setupPage(listData){
	// initial dropdown setup
	let dropdown = document.getElementById('player-dropdown');
	dropdown.length = 0;
	let defaultOption = document.createElement('option');
	defaultOption.text = 'Select a player...';
	dropdown.add(defaultOption);
	dropdown.selectedIndex = 0;
	let option;

	document.querySelector('.player-card').innerHTML = '';
	for(let i = 0; i < listData.players.length; i++){
		// build dropdown options
		option = document.createElement('option');
		option.text = `${listData.players[i].player.name.first} ${listData.players[i].player.name.last}`;
		option.value = listData.players[i].player.id;
		dropdown.add(option);
	};
};


function buildCard(selectedPlayerId, playersData){
	var thisSelectedPlayerId = selectedPlayerId;
	var selectedPlayer;
	for(var j = 0; j < playersData.players.length; j++){
		if(playersData.players[j].player.id == thisSelectedPlayerId){
			selectedPlayer = playersData.players[j];
			//console.log(selectedPlayer)
			break;
		}
	}
	var playerCardElement = document.querySelector('.player-card');
	playerCardElement.innerHTML = `
	<img class='item-img' src='src/img/p${selectedPlayer.player.id}.png' alt='${selectedPlayer.player.name.first} ${selectedPlayer.player.name.last}'><div class="card-info">
	<div class="club-logo">
	<div class="club-logo-icon" style="background-position: -${selectedPlayer.player.currentTeam.logoX}px -${selectedPlayer.player.currentTeam.logoY}px"></div>
	</div>
	<h2>${selectedPlayer.player.name.first} ${selectedPlayer.player.name.last}</h2>
	<p>${selectedPlayer.player.info.positionInfo}</p>
	<table class="table-stats">
		<tr>
		  <td>Appearances</td>
		  <td>${search("appearances", selectedPlayer.stats)}</td>
		</tr>
		<tr>
		  <td>Goals</td>
		  <td>${search("goals", selectedPlayer.stats)}</td>
		</tr>
		<tr>
			<td>Assists</td>
			<td>${search("goal_assist", selectedPlayer.stats)}</td>
		  </tr>
		  <tr>
			<td>Goals per match</td>
			<td>${Math.round((search("goals", selectedPlayer.stats) / search("appearances", selectedPlayer.stats))* 10) / 10}</td>
		  </tr>
		  <tr>
			<td>Passes per minute</td>	
			<td>${Math.round(((search("fwd_pass", selectedPlayer.stats)+search("backward_pass", selectedPlayer.stats)) / search("mins_played", selectedPlayer.stats))* 10) / 10}</td>
		  </tr>
	  </table>
	  </div>
	`;
}

// Get the player ID when dropdown menu changes
document.querySelector("#player-dropdown").onchange = function (){
	var selectedSortType = document.querySelector("#player-dropdown").value;
	buildCard(selectedSortType, myObj);
}

// Get stat values from JSON
function search(getStatKey, statArray){
    // for (var i=0; i < statArray.length; i++) {
    //     if (statArray[i].name === getStatKey) {
    //         return statArray[i].value;
	// 	}
	// }
	var returnedValue;
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
