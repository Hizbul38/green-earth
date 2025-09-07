const categoryList = document.getElementById('category-list')

const loadCategory= ()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data =>{
        console.log(data.categories)
        const categories = data.categories
        categories.forEach(cat => {
            categoryList.innerHTML +=`
            <li id="${cat.id}" class="my-2 hover:bg-green-500 rounded-full cursor-pointer">${cat.category_name}
</li>
`
        })
    })
}

loadCategory()