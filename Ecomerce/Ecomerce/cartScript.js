const cartItemElement = document.querySelector('.cart-item');
const cartTotal = document.querySelector('.cart-total');

document.addEventListener('DOMContentLoaded', function() {
    const data = JSON.parse(localStorage.getItem('CartItems')) || [];
    displayData(data);
    toCal(data);
});

let total = 0;

function toCal(data) {
    total = data.reduce((a, b) => a + b.price, 0);
    
    cartTotal.innerHTML = '';
    
    const p = document.createElement('p');
    p.innerText = `Total price of ${data.length} products is $${total}`;
    p.classList.add('total');

    const button = document.createElement("button");
    button.innerText = "Checkout Items";
    button.classList.add("cart-button");

    cartTotal.append(p, button);
    console.log(total);
}

function displayData(data) {
    
    cartItemElement.innerHTML = '';

    data.forEach((element, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("product-item");

        const img = document.createElement("img");
        img.src = element.images;
        img.classList.add("cart-image");

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("cart-details");

        const title = document.createElement("h3");
        title.innerText = element.title;
        title.classList.add("cart-title");

        const description = document.createElement("p");
        description.innerText = element.description;
        description.classList.add("cart-description");

        const price = document.createElement("p");
        price.innerText = `Price $${element.price}`;
        price.classList.add("cart-price");

        const button = document.createElement("button");
        button.innerText = "Remove Item";
        button.classList.add("cart-button");

        button.addEventListener('click', function() {
            removeItem(index);
        });

        detailsDiv.append(title, description, price, button);
        itemDiv.append(img, detailsDiv);
        cartItemElement.append(itemDiv);
    });
}



function removeItem(index) {
    // First, show a confirmation dialog
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!"
    }).then((result) => {
       
        if (result.isConfirmed) {
            let data = JSON.parse(localStorage.getItem('CartItems'));
            data.splice(index, 1);
            localStorage.setItem('CartItems', JSON.stringify(data));

            displayData(data);
            toCal(data);

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Product removed from cart successfully!',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    });
}


