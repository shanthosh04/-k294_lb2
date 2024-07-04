const image = document.getElementById('image');
const title = document.getElementById('title');
const price = document.getElementById('price');
const category = document.getElementById('category');

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

async function getProduct() {
    const res = await fetch(`http://localhost:3000/products/${id}`)    
    const data = await res.json()

    if (data.message) {
        alert("Product not found")
        window.location.href = "./index.html"
    }
    return data
}

async function getCategory(id) {
    const res = await fetch(`http://localhost:3000/categories/${id}`)
    const data = await res.json()
    return data
}

async function displayProduct() {
    const product = await getProduct()
    const category = await getCategory(product.categoryId)

    image.src= product.image;
    title.textContent = product.name;
    price.textContent = product.price;
    category.textContent = category.name;
}

displayProduct();