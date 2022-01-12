let products = JSON.parse(localStorage.getItem("products")) ? JSON.parse(localStorage.getItem("products")) : [];

function readproducts(products){
    document.querySelector("#productlist").innerHTML = ""
    products.forEach((product, i) => {
        document.querySelector("#productlist").innerHTML +=`
            <div class="card p-2">
                <img src="${product.img}"
                <div class="info"><b>${product.name}</b>  R${product.price}</div>
                <div class="p-2">
                  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-${i}">Edit</button>
                  <button class="btn btn-danger" onclick="delproduct(${i})">Delete</button>
                </div>
            <div>
            
            <div class="modal fade" id="modal-${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Edit product</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex flex-column">
                        <input class="p-2 m-2" id="modalInput-${i}" value="${product.name}">
                        <div class="p-2 m-2 row" >
                            <p class="col-6">Select catergory:</p>
                            <select class="col-6" name="catergory" id="catergoryModal${i}">
                                <option value="Bread">Bread</option>
                                <option value="Juices">Juices</option>
                                <option value="Sweets">Sweets</option>
                            </select>
                        </div>
                        <input class="p-2 m-2" type="text" id="PriceModalInput-${i}" value="${product.price}">
                        <input class="p-2 m-2" type="text" id="ImgModalInput-${i}" value="${product.img}">
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" onclick="editproduct(${i})" data-bs-toggle="modal" data-bs-target="#modal-${i}">Save changes</button>
                    </div>
                  </div>
                </div>
            </div>
        `
    });
}

readproducts(products)

function addproduct(){
    let newproduct = document.querySelector("#add").value
    let catergory = document.querySelector("#catergory").value
    let price = document.querySelector("#addPrice").value
    let img = document.querySelector("#addImg").value
    try{
        products.forEach(product => {
            if(product.name.toLowerCase() == newproduct.toLowerCase()) throw "product already added";
        })
        if(newproduct == "") throw "You didn't type anything";
        
        products.push({
          name: newproduct,
          catergory,
          price,
          img
        })
        localStorage.setItem("products", JSON.stringify(products))
        readproducts(products)
        document.querySelector("#add").value = ''
    }catch(err){
        alert(err)
    }
}

function delproduct(i){
    products.splice(i, 1)
    localStorage.setItem("products", JSON.stringify(products))
    readproducts(products)
}

function editproduct(i){
    let newproduct = document.querySelector(`#modalInput-${i}`).value
    let catergory = document.querySelector(`#catergoryModal${i}`).value
    let price = document.querySelector(`#PriceModalInput-${i}`).value
    let img = document.querySelector(`#ImgModalInput-${i}`).value
    try{
        products.forEach(product => {
            if(product.name.toLowerCase() == newproduct.toLowerCase()) throw "That product is already on the list";
        })
        if(newproduct == "") throw "You did'nt type anything";
        products[i] = {
          name: newproduct,
          catergory,
          price,
          img
        }
        localStorage.setItem("products", JSON.stringify(products))
        readproducts(products)
    }catch(err){
        alert(err)
    }
}