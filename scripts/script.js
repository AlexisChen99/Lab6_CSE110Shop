var locStor = window.localStorage;
var addList = [];

window.addEventListener("DOMContentLoaded", () => {
  if (locStor.getItem("items") == null) {
    pullFetch();
    createAndPutItems();
  }
  createAndPutItems()
});

/**
 * fetch from the url and store the data in the local storage
 */
async function pullFetch() {
  const response = await fetch("https://fakestoreapi.com/products");
  const json = await response.json();
  locStor.setItem("store", JSON.stringify(json));
}

/**
 * creates items and put them in the store 
 */
async function createAndPutItems() {
  // get the items in the store 
  var stores= JSON.parse(locStor.getItem("store"));
  var productList = document.getElementById("product-list");

  // if cart already exists
  if (locStor.getItem("itemCount")) {
    // get the cart from html and local storage and update  
    var count = document.getElementById("cart-count");
    addList = JSON.parse(locStor.getItem("itemCount"));
    count.innerHTML = addList.length;
    //if the card doesn't exist in local storage
  } else {
    // add an empty list to cart
    locStor.setItem("itemCount", addList);
  }

  //for all items, create an element for each of them and put it on the page
  for (i in stores) {
    var proItem;

    //id, imgSrc, title, itemPrice, added
    let id = stores[i].id;
    let imgSrc = stores[i].image;
    let title = stores[i].title;
    let price = stores[i].price;
    let added;

    //if the list has current item
    if (addList.includes(stores[i].id)) {
      added = "Remove from Cart";
    //if the list doesn't have current item 
    } else {
      added =  "Add to Cart";
    }
    //create the item element
    proItem = new ProductItem(id, imgSrc, title, price, added);

    //add the created item to product-list
    productList.appendChild(proItem);
  }
}