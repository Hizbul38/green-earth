const categoryList = document.getElementById('category-list')

const treeContainer = document.getElementById('treeContainer')

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
            <li id="${cat.id}" class="my-3 hover:bg-green-500 rounded-full cursor-pointer text-lg">${cat.category_name}
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
console.log(id)
fetch(`https://openapi.programming-hero.com/api/category/${id}`)
.then(res => res.json())
.then(data => {
    showTreeByCategory(data.plants)
})
}

const showTreeByCategory = (plants) => {
    console.log(plants)
    treeContainer.innerHTML = ""
    plants.forEach(plant => {
        treeContainer.innerHTML += `
        <div>
        <div>
        <img class="w-[400px] h-[250px]" src="${plant.image}"/>
        </div>
         <h1 class="text-lg font-semibold mt-2"> ${plant.name} </h1>
         <p class="text-gray-500 mt-2">${plant.description}</p>
         <div class="flex justify-between text-center mt-3">
         <button class="text-lg font-semibold text-green-700 bg-green-100 w-auto h-[30px] rounded-lg">${plant.category}</button>
         <p class="text-lg font-semibold">${plant.price}</p>
         </div>
         <div>
         <button class="bg-green-600 text-white text-lg font-semibold w-full h-10 rounded-full mt-5">Add to Curt</button>
         </div>
        </div>
        `
    })
}

loadCategory()
loadTreeByCategory('6')