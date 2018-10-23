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

    // Basket functionality
	document.querySelectorAll('.btn-addToCart').onclick = function (){
		
	};

	var addToCartButtons = document.querySelectorAll( ".btn-addToCart" );
	for ( let counter = 0; counter < addToCartButtons.length; counter++)
	{
	    addToCartButtons[counter].addEventListener("click", function(){
	    	let itemTitle = this.getAttribute('data-title');
			let itemPrice = this.getAttribute('data-price');
			let itemQuantity = this.getAttribute('data-quantity');
			let itemQuantityId = counter;
			itemQuantity++;
			this.setAttribute('data-quantity',itemQuantity);
			//console.log(itemQuantity);
			if(itemQuantity === 1){
				// this is a new item
				this.setAttribute('data-inBasket','inBasket');
				let basketItem = document.createElement('tr');
				let totalItemPrice = itemPrice;
				basketItem.setAttribute('data-inBasket','in-basket' + counter);
				basketItem.innerHTML = `
				<td>${itemTitle}</td>
				<td><span id='in-basket-${counter}'>${itemQuantity}</span></td>
				<td data-count='true' id='in-basket-price-${counter}'>${totalItemPrice}</td>
				<td><button class="remove-item" id='in-basket-remove-${counter}'>X</button></td>
				`;
				document.querySelector('.basket').appendChild(basketItem);
				calculateTotal();
				//console.log('Item added');
			} else {
				// basket already contains this item
				//console.log('Item already in basket');
				let totalItemPrice = itemPrice * itemQuantity;
				document.querySelector('#in-basket-' + counter).innerHTML = itemQuantity;
				document.querySelector('#in-basket-price-' + counter).innerHTML = totalItemPrice;
				calculateTotal();
			}
			
	   });
	};


	// Calculate total of basket
	function calculateTotal(){
		let basketTotalContainer = document.querySelector('#basket-total');
		basketTotalContainer.innerHTML = '';
		let basket = document.querySelector('.basket'), sumVal = 0;
		for(let i = 0; i < (basket.rows.length-1); i++){
			//console.log(basket.rows[i].cells[2].innerHTML);
			let numTotal = Number(basket.rows[i].cells[2].innerHTML);
			sumVal = sumVal + numTotal;

			// add functionality to remove button
		};
		//console.log(sumVal);
		basketTotalContainer.innerHTML = sumVal;
	};





// END PAGE FUNCTIONALITY
}, function(status) { //error detection
  console.log('Something went wrong.');
});


function buildList(listData){
	document.querySelector('.product-list').innerHTML = '';
	for(let i = 1; i < listData.products.length; i++){
		var productListItem = document.createElement('li');
		//productListItem.innerHTML = "<div id='product-" + i + "'><img src='" + listData.products[i].images[0].src + "' alt='" + listData.products[i].title + "'><h3>" + listData.products[i].title + "</h3><p>" + listData.products[i].variants[0].price + "</p></div>";
		productListItem.innerHTML = `
		<div><img src='${listData.products[i].images[0].src}' alt='${listData.products[i].title}'>
		<h3>${listData.products[i].title}</h3>
		<p>${listData.products[i].variants[0].price}</p>
		<button class='btn-addToCart' id='cartItem${i}' data-title='${listData.products[i].title}' data-price='${listData.products[i].variants[0].price}' data-quantity='${0}'>Add to cart</button>
		</div>`;
		document.querySelector('.product-list').appendChild(productListItem);
	};
}

// Basket functionality
// basketName = [];
// basketQuantity = [];
// basketPrice = [];









