class ProductItem extends HTMLElement {
  constructor(id, imgSrc, title, itemPrice, added) {
    //always call super first in the constructor
    super();

    // create a shadowroot that attach to product-list
    const shadowRoot = this.attachShadow({ mode: "open" });

    //create the name of the product
    var name = document.createElement("p");
    name.setAttribute("class", "title");
    name.innerHTML = title;

    //create the image of the product
    var image = document.createElement("img");
    image.setAttribute("width", 200);
    image.setAttribute("alt", title);
    image.setAttribute("src", imgSrc);

    //create the price of the product
    var price = document.createElement("p");
    price.setAttribute("class", "price");
    // Append $ sign to item price
    price.innerHTML = "$" + itemPrice;

    //create the button of the product 
    var button = document.createElement("button");
    button.innerHTML = added;


    //when users click, change added and modify cart and count
    button.onclick = function () {
      //get the count element
      let count = document.getElementById("cart-count");

      //if the item is not added 
      if (button.innerHTML == "Add to Cart") {
        //add the item and change the added to remove
        addList.push(id);
        button.innerHTML = "Remove from Cart";
        alert("Added to Cart!!");
      }
      //if the item is also added
      else {
        //remove the item from the cart 
        addList.splice(addList.indexOf(id), 1);
        button.innerHTML = "Add to Cart";
        alert("Removed from Cart!");
      }

      //update cart in local storage and count in the page
      locStor.setItem("itemCount", JSON.stringify(addList));
      count.innerHTML = addList.length;
    };

    // create a list that stores name, image, price, and button
    var list = document.createElement("li");
    list.setAttribute("class", "product");

    // Store the data onto the 'li' tag
    list.appendChild(image);
    list.appendChild(name);
    list.appendChild(price);
    list.appendChild(button);

    //create the element style 
    var style = document.createElement("style");

    //append list and style to the root 
    shadowRoot.appendChild(list);
    shadowRoot.appendChild(style);

    //css style
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `;
  }
}

customElements.define("product-item", ProductItem);