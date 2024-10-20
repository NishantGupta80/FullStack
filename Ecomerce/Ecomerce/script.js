const product = document.querySelector(".product");
const spinner = document.querySelector('.spinner');
const loadMore = document.querySelector('#load-more');
const searchTarget=document.querySelector('#search-target');

let data = [];
let cartData = [];

async function fetchData() {
  spinner.style.display="block";
  try {
    const res = await fetch("https://dummyjson.com/products");
    const ele = await res.json();
    data = ele.products;
    console.log(data);
    addProductsToPages(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
let i=0,j=i+8;
function addProductsToPages(data) {
  console.log(data);
  spinner.style.display="none";

  if(j >= data.length){
    loadMore.style.display = "none";
    j=data.length;
  }
  data.slice(i,j).forEach((element) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-item");

    const img = document.createElement("img");
    img.src = element.images;
    img.alt = element.title;
    img.classList.add("product-image");

    const h3 = document.createElement("h3");
    h3.innerText = element.title;
    h3.classList.add("product-title");

    const p = document.createElement("p");
    p.innerText = element.description;
    p.classList.add("product-description");

    const price = document.createElement("p");
    price.innerText = `Price : $${element.price}`;
    price.classList.add("product-price");

    const button = document.createElement("button");
    button.innerText = "Add to Cart";
    button.classList.add("cart-button");

    button.addEventListener('click', () => {
        cartData.push({
            title: element.title,
            description: element.description,
            price: element.price,
            images: element.images
        });
        cartItem(cartData);
    });

    productDiv.append(img, h3, p,price, button);
    product.appendChild(productDiv);
  });

}
function showTarget(){
   const searchVal=`${searchTarget.value}`.toLowerCase();
   if(searchVal.length == 0){
    i=0,j=i+8;
    addProductsToPages(data);
   } 
  const filteredData=data.filter((ele)=>{
    let title=`${ele.title}`.toLowerCase();
    if(title.startsWith(searchVal)){
      console.log(ele.title);
      return true;
    }
  })

  console.log(filteredData);
  if(filteredData.length>0){
    product.innerHTML="";
    i=0,j=filteredData.length;
    console.log("calling for filtered data");
   addProductsToPages(filteredData);
  }
  else{
    product.innerHTML="No data found";
  }
}
loadMore.addEventListener('click', () => {
  i+=8;
  j=j+8;
  addProductsToPages(data);
});
searchTarget.addEventListener('keyup',showTarget);
function cartItem(data) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Product added to cart successfully!',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  console.log(data);
  localStorage.setItem('CartItems', JSON.stringify(data));
}