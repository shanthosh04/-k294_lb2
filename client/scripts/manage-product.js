const token = localStorage.getItem('jwt')

async function getCategories() {
    const res = await fetch('http://localhost:3000/categories')
    const data = await res.json()

    return data
}


async function displayCategories() {
    const catergories = await getCategories()
    const tbody = document.getElementById('category-list')

    
    catergories.forEach(cat => {
        const tr = `
            <tr>
                <td class="py-2 px-4 border">${cat.name}</td>
                <td class="py-2 px-4 border">
                    <a href="./create-categorie.html?id=${cat.id}" class="bg-yellow-500 text-white font-medium rounded-lg text-sm px-2 py-1 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300">Bearbeiten</a>
                    <button onclick="deleteCategory(${cat.id})" class="bg-red-600 text-white font-medium rounded-lg text-sm px-2 py-1 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300">Löschen</button>
                </td>
            </tr>
        `
        tbody.insertAdjacentHTML('afterend', tr)
    });
}


displayCategories()


async function deleteCategory(id) {
    const isConfirmed = confirm("Are you sure you want to delete?")
    if (!isConfirmed) return

    const res = await fetch(`http://localhost:3000/categories/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    await res.json()
    window.location.reload()
} 


async function getProducts() {
  const res = await fetch('http://localhost:3000/products')
  const data = await res.json()

  return data
}


async function displayProducts() {
  const products = await getProducts()
  const tbody = document.getElementById('product-list')

  
  products.forEach(pro => {
      const tr = `
          <tr>
              <td class="py-2 px-4 border">${pro.name}</td>
              <td class="py-2 px-4 border">
                  <a href="./create-product.html?id=${pro.id}" class="bg-yellow-500 text-white font-medium rounded-lg text-sm px-2 py-1 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300">Bearbeiten</a>
                  <button onclick="deleteProduct(${pro.id})" class="bg-red-600 text-white font-medium rounded-lg text-sm px-2 py-1 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300">Löschen</button>
              </td>
          </tr>
      `
      tbody.insertAdjacentHTML('afterend', tr)
  });
}

displayProducts()

async function deleteProduct(id) {
    const isConfirmed = confirm("Are you sure you want to delete?")
    if (!isConfirmed) return

    const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    await res.json()
    window.location.reload()
}