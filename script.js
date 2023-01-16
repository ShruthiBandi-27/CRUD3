
const base = "https://fakestoreapi.com/products";

let allDetails = [];

let search = document.getElementById("search");
search.addEventListener("keyup",(event) => {
    if(allDetails.length === 0) getDetails();
    const filterData = allDetails.filter((x) => {
        let filteredValue = x.title.toLowerCase().includes(event.target.value.trim().toLowerCase())
                            || x.category.toLowerCase().includes(event.target.value.trim().toLowerCase());
        return filteredValue ;
    } )

    populateDetails(filterData);
})

//function to get details
const getDetails = async () => {
    try{
        const response = await fetch(`${base}`);
        const result = await response.json();
        console.log(result);
        allDetails = [];
        allDetails = [...result];
        //console.log(result.data.memes);
        populateDetails(allDetails);
    }
    catch(err) {
        console.log(err);
    }
}

//to populate data in table
const populateDetails = (data) => {
    //console.log(data);
    let tableRow = "";
    data.map((x,index) => {
        tableRow += `<tr id="${index}">
        <td class="align-middle" scope="row">${x.title}</td>
        <td class="align-middle">${x.category}</td>
        <td><img src ="${x.image}" class="img-fluid img"/></td>
        <td class="align-middle">$${x.price}</td>
        <td class="align-middle"><button type="button" class="btn btn-danger btn-md" onclick="deleteRecord(${index}, '${x.title}')">Delete</button></td>
        <td class="align-middle"><button type="button" class="btn btn-success btn-md" onclick="Buy(${x.id},${x.price}, '${x.title}')">Buy</button></td>
        </tr>`
    })
    //console.log(tableRow);

    let tbody = document.getElementById("tableBody");
    tbody.innerHTML = tableRow;
}

getDetails();

//to delete record from table
function deleteRecord(index, name) {
    if(confirm(`Do you want to delete the item: ${name}`)){
        let rowId = index;
        console.log(index);
        document.getElementById(rowId).remove();
    }
}

//payment of item choosen
function Buy(id, price, name){
    if(confirm(`Are you sure to buy?: ${name}`)){
        alert(`Pay $${price}`);
        alert("Payment successful");
    }
}

