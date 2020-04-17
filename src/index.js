import './scss/main.scss';

// import JSON file
const JSONFILE = './src/data/player-stats.json'

var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};
getJSON(JSONFILE).then(function(data) {
// START PAGE FUNCTIONALITY

    var myObj = data;

    // Detect new sort type when change dropdown
	// document.querySelector("#sort-list").onchange = function (){
		
	// }

	


	// Build list when page loads for first time
	buildList(myObj);
	//buildMenu();

    

// END PAGE FUNCTIONALITY
}, function(status) { //error detection
  console.log('Something went wrong.');
});


function buildList(listData){
	console.log(listData.players[0].player.name.first)
	// initial dropdown setup
	let dropdown = document.getElementById('player-dropdown');
	dropdown.length = 0;
	let defaultOption = document.createElement('option');
	defaultOption.text = 'Select a player...';
	dropdown.add(defaultOption);
	dropdown.selectedIndex = 0;
	let option;

	document.querySelector('.product-list').innerHTML = '';
	for(let i = 0; i < listData.players.length; i++){
		// build dropdown options
		option = document.createElement('option');
		option.text = `${listData.players[i].player.name.first} ${listData.players[i].player.name.last}`;
		option.value = listData.players[i].player.id;
		dropdown.add(option);

		// build player card
		var productListItem = document.createElement('li');
		productListItem.innerHTML = `
		<img class='item-img' src='src/img/p${listData.players[i].player.id}.png' alt='${listData.players[i].player.name.first} ${listData.players[i].player.name.last}'>
		<h2>${listData.players[i].player.name.first} ${listData.players[i].player.name.last}</h2>
		<p>${listData.players[i].player.info.positionInfo}</p>
		<table>
			<tr>
			  <td>Appearances</td>
			  <td>${search("appearances", listData.players[i].stats)}</td>
			</tr>
			<tr>
			  <td>Goals</td>
			  <td>${search("goals", listData.players[i].stats)}</td>
			</tr>
			<tr>
				<td>Assists</td>
				<td>${search("goal_assist", listData.players[i].stats)}</td>
			  </tr>
			  <tr>
				<td>Goals per match</td>
				<td>${Math.round((search("goals", listData.players[i].stats) / search("appearances", listData.players[i].stats))* 10) / 10}</td>
			  </tr>
			  <tr>
				<td>Passes per minute</td>
				
				<td>${Math.round(((search("fwd_pass", listData.players[i].stats)+search("backward_pass", listData.players[i].stats)) / search("mins_played", listData.players[i].stats))* 10) / 10}</td>
			  </tr>
		  </table>
		`;
		document.querySelector('.product-list').appendChild(productListItem);
	};
};

// Get the player ID when dropdown menu changes
document.querySelector("#player-dropdown").onchange = function (){
	var selectedSortType = document.querySelector("#player-dropdown").value;
}

// Get stat values from JSON
function search(getStatKey, statArray){
    for (var i=0; i < statArray.length; i++) {
        if (statArray[i].name === getStatKey) {
            return statArray[i].value;
        }
    }
}

// var array = [
//     { name:"appearances", value:"400", },
// 	{ name:"goals", value:"10", },
// 	{ name:"goal_assist", value:"2", },
	
// ];

// var getStat = search("goal_assist", array);

// console.log("result object", getStat.value)