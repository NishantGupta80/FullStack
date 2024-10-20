 async function searchProducts()
{
    let input=document.getElementById('searchBar');

   // let input = "shoes";
    
    let res = await fetch(`https://dummyjson.com/products/search?q=${input.value}`);
    let data =await res.json();
    console.log(data);

    const div = document.getElementById("container"); 
   div.innerHTML="";
      
    data.products.forEach((el)=>{
      
     const ul = document.createElement("ul");
     ul.innerHTML = `<span>${el.title}</span>`;
     div.appendChild(ul);
    })
}



//searchProducts