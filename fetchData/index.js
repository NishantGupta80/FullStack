const div = document.getElementById("items");
const search = document.querySelector("#search");

async function fetchTheData(e){
    e.preventDefault();
    div.innerHTML="";
    var data = inputValue.value;
    console.log(data);
  let response = await fetch("./data.json");
  let dataResponse =  await response.json();
  console.log(dataResponse);

  const table = document.createElement("table");

  dataResponse.data.forEach((el)=>{
    if(el.category == data){
    const tr = document.createElement("tr");
    const td = document.createElement("td");
     td.className = el.stock ? "InStock" : "OutStock";
    td.textContent=el.name;
    tr.appendChild(td);
    table.appendChild(tr);
    }
  })
  div.appendChild(table);

}

const inputValue = document.getElementById("inputValue");
search.addEventListener("click",(e) => fetchTheData(e));


// div.appendChild(table);





//fetchTheData();