let shop = document.getElementById('shop')


//Data of each item in the shop goes here
let shopItemsData = [
                    {
                        id: "dsgsdgfdgd",
                        name: "Casual Shirt", 
                        price: 45,
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
                        img: "images/img-1.jpg"
                    },
                    {
                        id: "sfdghsdfhg",
                        name: "Office Shirt", 
                        price: 100,
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
                        img: "images/img-2.jpg"
                    },
                    {
                        id: "vfdfgdhngf",
                        name: "T Shirt", 
                        price: 25,
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
                        img: "images/img-3.jpg"
                    },
                    {
                        id: "dfhgdfhfhdf",
                        name: "Mens Suit", 
                        price: 45,
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
                        img: "images/img-4.jpg"
                    },
                    
                    
                ]


//let basket = []  //A basket/trolly to add selected items 


//retrieve data from local storage
let basket = JSON.parse(localStorage.getItem('data'))  || []


//function that handles shop item generation
let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map( (eachShopItem) =>{

        
        let {id, name, price, desc, img} = eachShopItem; //destructure the shopitemsData
        let search = basket.find( x => x.id === id ) || []
        return `
        <div id=product-id-${id} class="item">
            <img width="220" src=${img} alt="">
            <div class="details">
                <h3> ${name} </h3>
                <p> ${desc} </p>
                <div class="price-quantity">
                    <h2>$ ${price} </h2>
                    <div class="buttons">
                        <i onclick ='decrement(${id})' class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${search.id ===undefined ? 0 : search.item}</div>
                        <i  onclick ='increment(${id})' class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>`
    } ).join("") )
}

//shop item generator call
generateShop()



//handles adding items to the basket
let increment = (id) =>{
    let selectedItem = id
    
    //search if item exist in basket
    let search = basket.find( (basketItem) => basketItem.id === selectedItem.id)
    if(search === undefined){


        basket.push({  //push item to the basket on click
            id: selectedItem.id,
            item: 1   
        })
    } else{
        search.item += 1
    }
    console.log(basket)

    //Call the update function to keep track of the change 
    update(selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket))
}

//Handles removal of items from the basket
let decrement = (id) =>{
    let selectedItem = id
    
    //search if item exist in basket
    let search = basket.find( (basketItem) => basketItem.id === selectedItem.id)
    
    if(search === undefined) return
    else if(search.item === 0) return
     else{
        search.item -= 1 //Decrease item in basket by 1
    }
    //push item to the basket on click
   //console.log(basket)
   
   //Call the update function to keep track of the change     
   update(selectedItem.id)

   //filters the basket for unselected items
   basket = basket.filter( (x) => x.item !== 0 )
   
   localStorage.setItem("data", JSON.stringify(basket))

}

//handles updates of quantities of items   
let update = (id) =>{
    let search = basket.find(basketItem => basketItem.id === id)
    //console.log(search.item)
    document.getElementById(id).innerHTML = search.item

    //call the calculation function
    calculation()
}

//handle total items selected
let calculation = () =>{
    let cartIcon = document.getElementById('cartAmount')
    cartIcon.innerHTML = basket.map( (x) =>x.item ).reduce((a, c ) => a + c, 0)
//     cartIconAmount = basket.map( (x) =>x.item ).reduce((a, c ) => a + c, 0)

//     localStorage.setItem('cartAmount', JSON.parse(cartIconAmount))
// cartIcon.innerHTML = (cartIconAmount === undefined) ? 0 : JSON.parse(localStorage.getItem('cartAmount'))   

    
}
//make a recalculation to update the basket cartIconAmount
calculation()