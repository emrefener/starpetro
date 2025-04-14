// Ürünleri kaydet
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');
    const listContainer = document.getElementById('productList');
    const detailContainer = document.getElementById('productDetail');

    // Ürün ekleme (admin.html)
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('productName').value;
            const desc = document.getElementById('productDesc').value;
            const image = document.getElementById('productImage').value;

            const products = JSON.parse(localStorage.getItem('products')) || [];
            const newProduct = { id: Date.now(), name, desc, image };
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            alert('Ürün kaydedildi!');
            form.reset();
        });
    }

    // Ürünleri listeleme (index.html)
    if (listContainer) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach(product => {
            const div = document.createElement('div');
            div.className = 'product-card';
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p><a href="urun-detay.html?id=${product.id}">Detaya Git</a></p>
            `;
            listContainer.appendChild(div);
        });
    }

    // Ürün detayı (urun-detay.html)
    if (detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(p => p.id == id);

        if (product) {
            detailContainer.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.desc}</p>
            `;
        } else {
            detailContainer.innerHTML = `<p>Ürün bulunamadı.</p>`;
        }
    }
});
