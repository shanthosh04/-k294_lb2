const productForm = document.getElementById('product-form');
const categorySelect = document.getElementById('categoryId');

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');
const token = localStorage.getItem("jwt");

productForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = {};
    
    formData.forEach((value, key) => {
        if (!value) {
            alert("Please fill in all the inputs!");
            return;
        }
        data[key] = value;
    });

    try {
        const res = await createOrUpdateProduct(data);
        window.location.href = "./index.html"
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

async function createOrUpdateProduct(product) {
    const url = id ? `http://localhost:3000/products/${id}` : `http://localhost:3000/products`;
    const method = id ? 'PUT' : 'POST';

    try {
        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(product),
        });

        if (!res.ok) {
            const message = await res.text();
            throw new Error(message);
        }

        return await res.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getProduct() {
    if (id) {
        try {
            const res = await fetch(`http://localhost:3000/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!res.ok) {
                const message = await res.text();
                throw new Error(message);
            }

            const data = await res.json();

            if (data.message) {
                alert(data.message);
                return null;
            }

            return data;
        } catch (error) {
            alert(`Error: ${error.message}`);
            return null;
        }
    }
    return null;
}

async function populateInputFields() {
    const product = await getProduct();
    if (product) {
        document.getElementById('name').value = product.name || "";
        document.getElementById('price').value = product.price || "";
        document.getElementById('image').value = product.image || "";
        document.getElementById('categoryId').value = product.categoryId || "";
    }
}

if (id) {
    populateInputFields();
}

async function populateCategories() {
    try {
        const res = await fetch(`http://localhost:3000/categories`);
        if (!res.ok) {
            const message = await res.text();
            throw new Error(message);
        }
        const data = await res.json();

        data.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.id;
            opt.text = cat.name;
            categorySelect.appendChild(opt);
        });
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

populateCategories();
