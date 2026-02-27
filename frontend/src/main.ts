import './style.css'
import { Product } from './types/Product';
import { Order } from './types/Order';

const API_URL = 'http://localhost:3000/products';
const ORDER_URL = 'http://localhost:3000/orders';

// Hämtar och visa produkter, GET /products
const fetchProducts = async () => {
    const response = await fetch(API_URL);
    const products: Product[] = await response.json(); 

// Visar produkterna i listan
    const list = document.getElementById('product-list');  
    if (list) {
        list.innerHTML = products.map((p: Product) => `
            <div class="product">
                <span><strong>${p.name}</strong> - ${p.price} kr</span>
                <button onclick="deleteProduct(${p.id})">Ta bort</button>
            </div>
        `).join('');
    }
};

// Tar bort produkt
const deleteProduct = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchProducts();
};
(window as any).deleteProduct = deleteProduct;

// Skapar produkt vid submit
document.getElementById('product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const price = (document.getElementById('price') as HTMLInputElement).value;

// Skickar POST request för att skapa produkt    
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price: Number(price) })
    });

// Rensar input och uppdatera listan    
    (document.getElementById('name') as HTMLInputElement).value = '';
    (document.getElementById('price') as HTMLInputElement).value = '';
    fetchProducts();
});

// Ladda vid start
fetchProducts();


// Hämtar och visa ordrar, GET /orders
const fetchOrders = async () => {
    const response = await fetch(ORDER_URL);
    const orders: Order[] = await response.json(); 

// Visar orders i listan
    const list = document.getElementById('order-list');  
    if (list) {
        list.innerHTML = orders.map((p: Order) => `
            <div class="order">
                <span><strong>${p.customerName}</strong> - ${p.price} kr</span>
                <button onclick="deleteOrder(${p.id})">Ta bort</button>
            </div>
        `).join('');
    }
};

// Tar bort order
const deleteOrder = async (id: number) => {
    await fetch(`${ORDER_URL}/${id}`, { method: 'DELETE' });
    fetchOrders();
};
(window as any).deleteOrder = deleteOrder;

// Ladda ordrar vid knappklick
document.getElementById('load-orders')?.addEventListener('click', fetchOrders);