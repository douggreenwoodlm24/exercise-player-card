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
				sortListDirPrice("asc");
				break;
			case "price-high-low":
				sortListDirPrice("desc");
				break;
			case "title-a-z":
				sortListDirTitle("asc");
				break;
			case "title-z-a":
				sortListDirTitle("desc");
				break;
			default:
				sortListDirTitle("asc");
			}
	}


	// Build list when page loads for first time
    buildList(myObj);

    // Basket functionality
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
				// Remove item button
				document.addEventListener('click', function (event) {
					if (event.target.matches('#in-basket-remove-' + counter)) {
						// remove current row

						// recalculate total
					}
				}, false);

				document.querySelector('.basket').appendChild(basketItem);
				calculateTotal();
			} else {
				// basket already contains this item
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
		let basket = document.querySelector('.basket'), basketTotalVal = 0;
		for(let i = 0; i < (basket.rows.length-1); i++){
			//console.log(basket.rows[i].cells[2].innerHTML);
			let rowTotal = Number(basket.rows[i].cells[2].innerHTML);
			basketTotalVal = basketTotalVal + rowTotal;
		};
		basketTotalContainer.innerHTML = basketTotalVal;
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
		<img src='${listData.products[i].images[0].src}' alt='${listData.products[i].title}'>
		<h3 class='item-title'>${listData.products[i].title}</h3>
		<p class='item-price'>${listData.products[i].variants[0].price}</p>
		<button class='btn-addToCart' id='cartItem${i}' data-title='${listData.products[i].title}' data-price='${listData.products[i].variants[0].price}' data-quantity='${0}'>Add to cart</button>
		<button class='quick-view'>Quick View</button>
		`;
		document.querySelector('.product-list').appendChild(productListItem);
	};
};

function sortListDirTitle(direction) {
  var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
  list = document.querySelector(".product-list");
  switching = true;
  //Set the sorting direction to ascending:
  dir = direction; 
  //Make a loop that will continue until no switching has been done:
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("li");
    //Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*check if the next item should switch place with the current item,
      based on the sorting direction (asc or desc):*/
      if (dir == "asc") {
        if (b[i].querySelector('.item-title').innerHTML.toLowerCase() > b[i + 1].querySelector('.item-title').innerHTML.toLowerCase()) {
          /*if next item is alphabetically lower than current item,
          mark as a switch and break the loop:*/
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (b[i].querySelector('.item-title').innerHTML.toLowerCase() < b[i + 1].querySelector('.item-title').innerHTML.toLowerCase()) {
          /*if next item is alphabetically higher than current item,
          mark as a switch and break the loop:*/
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      //Each time a switch is done, increase switchcount by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function sortListDirPrice(direction) {
  var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
  list = document.querySelector(".product-list");
  switching = true;
  //Set the sorting direction to ascending:
  dir = direction; 
  //Make a loop that will continue until no switching has been done:
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("li");
    //Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*check if the next item should switch place with the current item,
      based on the sorting direction (asc or desc):*/
      if (dir == "asc") {
        if (b[i].querySelector('.item-price').innerHTML.toLowerCase() > b[i + 1].querySelector('.item-price').innerHTML.toLowerCase()) {
          /*if next item is alphabetically lower than current item,
          mark as a switch and break the loop:*/
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (b[i].querySelector('.item-price').innerHTML.toLowerCase() < b[i + 1].querySelector('.item-price').innerHTML.toLowerCase()) {
          /*if next item is alphabetically higher than current item,
          mark as a switch and break the loop:*/
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      //Each time a switch is done, increase switchcount by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}