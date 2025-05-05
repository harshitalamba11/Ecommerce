// // Retrieve cart items from local storage
// var cartarr = JSON.parse(localStorage.getItem("BagListObj")) || [];
// var itemcount = cartarr.length;
// localStorage.setItem("itemcount", itemcount);

// // Calculate MRP, amount, and discount
// var MRP = cartarr.reduce((sum, item) => {
//     return sum + parseFloat(item.strikedoffprice.split(" ")[1]); // Assuming price is in format "Rs. 1000"
// }, 0);
// localStorage.setItem("MRP", MRP);

// var amount = cartarr.reduce((sum, item) => {
//     return sum + parseFloat(item.price.split(" ")[1]); // Assuming price is in format "Rs. 800"
// }, 0);
// localStorage.setItem("amount", amount);

// var discount = MRP - amount;
// localStorage.setItem("discount", discount);

// // Update the UI with calculated values
// document.querySelector(".amount_pay").innerText = amount.toFixed(2);
// document.querySelector(".filldiscount").innerText = "- " + discount.toFixed(2);
// document.querySelector(".totalprice").innerText = MRP.toFixed(2);
// document.querySelector(".pricedets").innerText = `PRICE DETAILS (${itemcount} Items)`;

// // Display cart items
// function displayCartItems() {
//     const container = document.querySelector(".container");
//     container.innerHTML = ""; // Clear existing items

//     cartarr.forEach((item, index) => {
//         var box = document.createElement("div");
//         box.className = "main";

//         var imgbox = document.createElement("div");
//         var image = document.createElement("img");
//         image.src = item.image_url; // Assuming image_url is part of the item
//         imgbox.append(image);

//         var detailsbox = document.createElement("div");
//         var name = document.createElement("p");
//         name.innerText = item.brand; // Assuming brand is part of the item
//         name.style.fontSize = "20px";
//         name.style.marginBottom = "-8px";

//         var para = document.createElement("p");
//         para.innerText = item.para; // Assuming para is part of the item
//         para.style.color = "gray";

//         var price = document.createElement("span");
//         price.innerText = item.price;

//         var strikedprice = document.createElement("span");
//         strikedprice.innerText = item.strikedoffprice;
//         strikedprice.style.textDecoration = "line-through";
//         strikedprice.style.color = "gray";

//         var offer = document.createElement("span");
//         offer.innerText = item.offer; // Assuming offer is part of the item
//         offer.style.color = "red";

//         var pricepara = document.createElement("p");
//         pricepara.append(price, strikedprice);
//         detailsbox.append(name, para, pricepara, offer);

//         var buttonbox = document.createElement("div");
//         var remove = document.createElement("button");
//         remove.innerText = "REMOVE";
//         remove.addEventListener("click", function() {
//             removeItem(index);
//         });

//         buttonbox.append(remove);
//         box.append(imgbox, detailsbox, buttonbox);
//         container.append(box);
//     });
// }

// // Function to add item to cart via API
// function addItemToCart(item) {
//     const userId = 1; // Replace with actual user ID if available
//     fetch('/api/cart', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             productId: item.productId, // Assuming productId is part of the item
//             quantity: 1, // Default quantity
//             price: parseFloat(item.price.split(" ")[1]), // Assuming price is in format "Rs. 800"
//             userId: userId
//         }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         // Optionally, update the UI or local storage after adding the item
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// }

// // Function to remove an item from the cart
// function removeItem(index) {
//     cartarr.splice(index, 1);
//     localStorage.setItem("BagListObj", JSON.stringify(cartarr));
//     displayCartItems(); // Refresh the displayed cart items
// }

// // Event listener for placing an order
// document.querySelector(".makeorder").addEventListener("click", function() {
//     window.location.href = "../payment/address.html";
// });

// // Event listener for applying promo code
// document.querySelector(".apply").addEventListener("click", discountFun);
// function discountFun() {
//   var payable_amount = parseFloat(localStorage.getItem("amount"));
//   var int_promo = document.querySelector("#promo").value;

//   if (payable_amount > 300 && int_promo === "C&B300") {
//       // Apply the discount
//       amount -= 300; // Deduct the discount from the total amount
//       discount += 300; // Increase the discount value
//       localStorage.setItem("amount", amount); // Update the amount in local storage
//       localStorage.setItem("discount", discount); // Update the discount in local storage

//       // Update the UI with the new amounts
//       document.querySelector(".amount_pay").innerText = amount.toFixed(2);
//       document.querySelector(".filldiscount").innerText = "- " + discount.toFixed(2);
      
//       // Optionally, disable the promo code button after successful application
//       document.querySelector(".apply").disabled = true;
//       document.querySelector(".apply").innerText = "Promo Applied";
//   } else {
//       alert("Invalid promo code or conditions not met.");
//   }
// }

// // Event listener for landing page navigation
// document.getElementById('landingPage').addEventListener('click', function() {
//   window.location.href = "../Landingpage/index.html";
// });

// // Event listener for address navigation
// document.querySelector("#second").addEventListener("click", function() {
//   window.location.href = "../Profile/signup.html";
// });

// // Function to initialize the cart on page load
// function initializeCart() {
//   // Display cart items from local storage
//   displayCartItems();

//   // Optionally, add items to the cart via API if they are in local storage
//   cartarr.forEach(item => {
//       addItemToCart(item); // Call the function to add each item to the cart via API
//   });
// }

// // Call the initialize function when the page loads
// window.onload = initializeCart;able


// Retrieve cart items from local storage
var cartarr = JSON.parse(localStorage.getItem("BagListObj")) || [];
var itemcount = cartarr.length;
localStorage.setItem("itemcount", itemcount);

// Calculate MRP, amount, and discount
var MRP = cartarr.reduce((sum, item) => {
    return sum + parseFloat(item.strikedoffprice.split(" ")[1]);
}, 0);
localStorage.setItem("MRP", MRP);

var amount = cartarr.reduce((sum, item) => {
    return sum + parseFloat(item.price.split(" ")[1]);
}, 0);
localStorage.setItem("amount", amount);

var discount = MRP - amount;
localStorage.setItem("discount", discount);

// Update the UI
document.querySelector(".amount_pay").innerText = amount.toFixed(2);
document.querySelector(".filldiscount").innerText = "- " + discount.toFixed(2);
document.querySelector(".totalprice").innerText = MRP.toFixed(2);
document.querySelector(".pricedets").innerText = `PRICE DETAILS (${itemcount} Items)`;

// Display cart items
function displayCartItems() {
    const container = document.querySelector(".container");
    container.innerHTML = "";

    cartarr.forEach((item, index) => {
        var box = document.createElement("div");
        box.className = "main";

        var imgbox = document.createElement("div");
        var image = document.createElement("img");
        image.src = item.image_url;
        imgbox.append(image);

        var detailsbox = document.createElement("div");
        var name = document.createElement("p");
        name.innerText = item.brand;
        name.style.fontSize = "20px";
        name.style.marginBottom = "-8px";

        var para = document.createElement("p");
        para.innerText = item.para;
        para.style.color = "gray";

        var price = document.createElement("span");
        price.innerText = item.price;

        var strikedprice = document.createElement("span");
        strikedprice.innerText = item.strikedoffprice;
        strikedprice.style.textDecoration = "line-through";
        strikedprice.style.color = "gray";

        var offer = document.createElement("span");
        offer.innerText = item.offer;
        offer.style.color = "red";

        var pricepara = document.createElement("p");
        pricepara.append(price, strikedprice);
        detailsbox.append(name, para, pricepara, offer);

        var buttonbox = document.createElement("div");
        var remove = document.createElement("button");
        remove.innerText = "REMOVE";
        remove.addEventListener("click", function () {
            removeItem(index);
        });

        buttonbox.append(remove);
        box.append(imgbox, detailsbox, buttonbox);
        container.append(box);
    });
}

function addItemToCart(item) {
    const userId = 1; // Replace with real user ID

    fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: item.productId || "demo-product-id",  // Replace with real logic
            quantity: 1,
            price: parseFloat(item.price.split(" ")[1]),
            userId: userId
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('✅ Cart saved:', data);
    })
    .catch(error => {
        console.error('❌ Error adding to cart:', error);
    });
}


// Remove item from cart
function removeItem(index) {
    cartarr.splice(index, 1);
    localStorage.setItem("BagListObj", JSON.stringify(cartarr));
    displayCartItems();
}

// Order placement
document.querySelector(".makeorder").addEventListener("click", function () {
    window.location.href = "../payment/address.html";
});

// Apply promo code
document.querySelector(".apply").addEventListener("click", discountFun);
function discountFun() {
    var amount = parseFloat(localStorage.getItem("amount"));
    var discount = parseFloat(localStorage.getItem("discount"));
    var int_promo = document.querySelector("#promo").value;

    if (amount > 300 && int_promo === "C&B300") {
        amount -= 300;
        discount += 300;

        localStorage.setItem("amount", amount);
        localStorage.setItem("discount", discount);

        document.querySelector(".amount_pay").innerText = amount.toFixed(2);
        document.querySelector(".filldiscount").innerText = "- " + discount.toFixed(2);

        document.querySelector(".apply").disabled = true;
        document.querySelector(".apply").innerText = "Promo Applied";
    } else {
        alert("Invalid promo code or conditions not met.");
    }
}

// Navigate to landing or address pages
document.getElementById('landingPage').addEventListener('click', function () {
    window.location.href = "../Landingpage/index.html";
});

document.querySelector("#second").addEventListener("click", function () {
    window.location.href = "../Profile/signup.html";
});

// On load, render cart and sync with backend
function initializeCart() {
    displayCartItems();
    cartarr.forEach(item => {
        addItemToCart(item);
    });
}

window.onload = initializeCart;