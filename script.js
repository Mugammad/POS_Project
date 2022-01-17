let products = [
    {
        name: "henties",
        catergory: "Juices",  
        price: "10",
        img: "https://www.game.co.za/medias/583388-EA-1200x1200.jpg?context=bWFzdGVyfGltYWdlc19vbmVjb218MTQxNzE4fGltYWdlL2pwZWd8aDFhL2gyOC84OTU0NTU1NzYwNjcwLmpwZ3w2OGRmNTgyMDBhNjNjNzM1YWIxZmIzMTVkMDgyNjI3Y2NkMjk4NWE4YWM2Y2ZmNTI1NTJhMDljZDk3OTVlOTdh"
    },
    {
        name: "roll",
        catergory: "Bread",
        price: "5",
        img: "https://www.melskitchencafe.com/wp-content/uploads/french-bread-roll1.jpg"
    },
    {
        name: "chocolate",
        catergory: "Sweets",
        price: "8",
        img: "https://www.checkers.co.za/medias/10398824EA-20190726-Media-checkers515Wx515H?context=bWFzdGVyfGltYWdlc3wxMTY1NzV8aW1hZ2UvcG5nfGltYWdlcy9oNzMvaGYwLzg4NTg5NjM5MzUyNjIucG5nfDU3OTYxZDcxN2I5OTY5ZjNlYjMwOTM1NzRmNDMxMDU3MzI0YWIzMzA0ZmNjNmExZGMzZDAxOTFlNzk4NGU2Y2Q"
    },
    {
        name: "loaf",
        catergory: "Bread",
        price: "10000",
        img: "https://www.thespruceeats.com/thmb/aKWwztjCoTsiPzayXvDYx6QLyOs=/4288x2412/smart/filters:no_upscale()/loaf-of-bread-182835505-58a7008c5f9b58a3c91c9a14.jpg"
    }
]

products = JSON.parse(localStorage.getItem("products")) ? JSON.parse(localStorage.getItem("products")) : products;

let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];

function readproducts(products){
    document.querySelector("#productlist").innerHTML = ""
    document.querySelector('.badge').innerHTML = ''
    products.forEach((product, i) => {
        document.querySelector("#productlist").innerHTML +=`
            <div class="card p-2">
                <img src="${product.img}"
                <p class="info"><b>${product.name}</b>  R${product.price}</p>
                <div class="p-2 row">
                    <input type="number" min=1 value=1 id="qtyInput-${i}" class="col-6">
                    <button class="btn btn-success col-6" onclick="addToCart(${i})">Add to cart</button>
                    <button class="btn btn-primary col-6 mt-3" data-bs-toggle="modal" data-bs-target="#modal-${i}">Edit</button>
                    <button class="btn btn-danger col-6 mt-3" onclick="delproduct(${i})">Delete</button>
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

    let totalQty = 0

    cart.forEach(item =>{
        totalQty += parseInt(item.qty)
    })
    if(totalQty != 0){
        document.querySelector('.badge').innerHTML = totalQty
    }
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
        if(newproduct == "" || price == "" || img == "") throw "You didn't fill in all inputs";
        
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
        if(newproduct == "" || price == "" || img == "") throw "You didn't fill in all inputs";
        products.forEach(product => {
            if(product.name.toLowerCase() == newproduct.toLowerCase()) throw "That product is already on the list";
        })
        if(newproduct == "") throw "You didn't type anything";
        if(!img.startsWith("https")) throw "invalid image source"
        
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

function addToCart(i){
    let qty = document.querySelector(`#qtyInput-${i}`).value;
    let inCart = false;
    cart.forEach((item) => {
        if(products[i].name == item.name){
            item.qty = parseInt(item.qty) + parseInt(qty)
            inCart = true
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    })

    if(!inCart){
        cart.push({...products[i], qty})
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    readproducts(products)
}



//filter stuff

function sortByCategory(){
    sortName()
    priceSort()
    readproducts(filteredProducts)
}

function priceSort() {
    document.querySelector("#sortName").value = "empty"
    let direction = document.querySelector("#priceSort").value;
    let sortby = document.querySelector('#sortCategory').value
    let filteredProducts
    if(sortby == "All"){
        readproducts(products)
        filteredProducts = products
    }else{
        filteredProducts = products.filter(product =>{
            return product.catergory == sortby
        })
    }
    
  
    let sortedProducts = filteredProducts.sort((a, b) => a.price - b.price);
  
    console.log(sortedProducts);
  
    if (direction == "Descending") sortedProducts.reverse();
    readproducts(sortedProducts);
  }

  function sortName() {
    document.querySelector("#priceSort").value = "empty";
    let direction = document.querySelector("#sortName").value;
    let sortby = document.querySelector('#sortCategory').value
    if(sortby == "All"){
        readproducts(products)
        filteredProducts = products
    }else{
        filteredProducts = products.filter(product =>{
            return product.catergory == sortby
        })
    }
  
    let sortedProducts = filteredProducts.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    if (direction == "Descending") sortedProducts.reverse();
    console.log(sortedProducts);
    readproducts(sortedProducts);
  }