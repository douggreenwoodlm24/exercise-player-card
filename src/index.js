import './scss/main.scss';

// import JSON file
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
getJSON('https://j-parre.myshopify.com/products.json').then(function(data) {
// START PAGE FUNCTIONALITY

    var myObj = data;

    // Detect new sort type when change dropdown
	document.querySelector("#sort-list").onchange = function (){
		var selectedSortType = document.querySelector("#sort-list").value;
		switch (selectedSortType) {
			case "price-low-high":
				sortPriceLowHigh();
				break;
			case "price-high-low":
				sortPriceHighLow();
				break;
			case "title-a-z":
				sortTitleAZ();
				break;
			case "title-z-a":
				sortTitleZA();
				break;
			default:
				sortTitleAZ();
			}
	}
	function sortPriceLowHigh(){
		myObj.products.sort( function( a, b ) {
		    return a.variants[0].price < b.variants[0].price ? -1 : a.variants[0].price > b.variants[0].price ? 1 : 0;
		});
		for(let i = 1; i < myObj.products.length; i++){
			//console.log(myObj.products[i].title, myObj.products[i].variants[0].price);
			buildList(myObj);
		};
	};
	function sortPriceHighLow(){
		myObj.products.sort( function( a, b ) {
		    return a.variants[0].price < b.variants[0].price ? 1 : a.variants[0].price > b.variants[0].price ? -1 : 0;
		});
		for(let i = 1; i < myObj.products.length; i++){
			//console.log(myObj.products[i].title, myObj.products[i].variants[0].price);
			buildList(myObj);
		};
	};
	function sortTitleAZ(){
		myObj.products.sort( function( a, b ) {
		    return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
		});
		for(let i = 1; i < myObj.products.length; i++){
			//console.log(myObj.products[i].title, myObj.products[i].variants[0].price);
			buildList(myObj);
		};
	};
	function sortTitleZA(){
		myObj.products.sort( function( a, b ) {
		    return a.title < b.title ? 1 : a.title > b.title ? -1 : 0;
		});
		for(let i = 1; i < myObj.products.length; i++){
			//console.log(myObj.products[i].title, myObj.products[i].variants[0].price);
			buildList(myObj);
		};
	};

	// Build list when page loads for first time
    buildList(myObj);


	


// END PAGE FUNCTIONALITY
}, function(status) { //error detection
  console.log('Something went wrong.');
});


function buildList(listData){
	document.querySelector('.product-list').innerHTML = '';
	for(let i = 1; i < listData.products.length; i++){
		var productListItem = document.createElement('li');
		productListItem.innerHTML = "<div id='product-" + i + "'><img src='" + listData.products[i].images[0].src + "' alt='" + listData.products[i].title + "'><h3>" + listData.products[i].title + "</h3><p>" + listData.products[i].variants[0].price + "</p></div>";
		document.querySelector('.product-list').appendChild(productListItem);
	};
}









