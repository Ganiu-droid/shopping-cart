//retrieve data from local storage
let basket = JSON.parse(localStorage.getItem('data'))  || []

console.log(basket)