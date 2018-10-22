import './scss/main.scss';

// import JSON file and display the product image, title and price in list
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        console.log(myObj);

        for(let i = 1; i < myObj.products.length; i++){
			var productListItem = document.createElement('li');
			productListItem.innerHTML = "<img src='" + myObj.products[i].images[0].src + "' alt='" + myObj.products[i].title + "'><h3>" + myObj.products[i].title + "</h3><p>" + myObj.products[i].variants[0].price + "</p>";
			document.querySelector('.product-list').appendChild(productListItem);
		};
    }
};
xmlhttp.open("GET", "https://j-parre.myshopify.com/products.json", true);
xmlhttp.send();

// Perform the correct function when select from sorting dropdown
document.querySelector("#sort-list").onchange = function(){
	let sortThis = this.value;
	
}


