const categoryList = document.getElementById('category-list')

const treeContainer = document.getElementById('treeContainer')

const cartContainer = document.getElementById('cartContainer')

let addToCart = []

const loadCategory= ()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data =>{
        // console.log(data.categories)
        const categories = data.categories
        showCategory(categories)
        
    })

    const showCategory= (categories) => {
        categories.forEach(cat => {
            categoryList.innerHTML +=`
            <li id="${cat.id}" class="my-3 hover:bg-green-300 rounded-full cursor-pointer text-lg">${cat.category_name}
</li>
`
        })
    }

    categoryList.addEventListener('click', (e)=>{
    const allLi= document.querySelectorAll('li')
    allLi.forEach(li =>{
            li.classList.remove('bg-green-500')
        })

      if(e.target.localName === 'li') {
        // console.log(e.target.id )
        e.target.classList.add('bg-green-500')
        loadTreeByCategory(e.target.id)
      }
    })
}

const loadTreeByCategory = (id) =>{
// console.log(id)
fetch(`https://openapi.programming-hero.com/api/category/${id}`)
.then(res => res.json())
.then(data => {
    showTreeByCategory(data.plants)
})
}

const showTreeByCategory = (plants) => {
    // console.log(plants)
    treeContainer.innerHTML = ""
    plants.forEach(plant => {
        treeContainer.innerHTML += `
        <div id="${plant.id}">
        <div>
        <img class="w-[400px] h-[250px]" src="${plant.image}"/>
        </div>
         <h1 class="text-lg font-semibold mt-2"> ${plant.name} </h1>
         <p class="text-gray-500 mt-2">${plant.description}</p>
         <div class="flex justify-between text-center mt-3">
         <button class="text-lg font-semibold text-green-700 bg-green-100 w-auto h-[30px] rounded-lg">${plant.category}</button>
         <p class="text-lg font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</p>
         </div>
         <button class=" bg-green-600 text-white text-lg font-semibold w-full h-10 rounded-full mt-5">Add to Curt</button>
        </div>
        `
    })
}

treeContainer.addEventListener('click', (e) =>{
    // console.log(e.target.innerText)
    if(e.target.innerText === 'Add to Curt'){
    handleCart(e)
    }
} )

const handleCart = (e) =>{
   const name = e.target.parentNode.children[1].innerText
    const price = e.target.parentNode.children[3].innerText
    const id = e.target.parentNode.id
    addToCart.push({
        name: name,
        price: price,
        id: id
    })
     showaddToCart(addToCart) 
}

const showaddToCart= (addToCart) => {
    cartContainer.innerHTML =""
addToCart.forEach(cart => {
cartContainer.innerHTML +=`
<div class=" m-5 p-2 bg-green-50 rounded-lg">
<h1 class="text-xl font-semibold">${cart.name}</h1>
<p onclick="handleDeleteCart('${cart.id}')"(" class="text-right"><i class="fa-solid fa-xmark"></i></p>
<p class="text-gray-600 text-xl">${cart.price}</p>
</div>
`
})
}

handleDeleteCart = (cartId) =>{
const filterAddToCart = addToCart.filter(cart => cart.id !== cartId)
addToCart = filterAddToCart
showaddToCart(addToCart)
}

loadCategory()
loadTreeByCategory('6')