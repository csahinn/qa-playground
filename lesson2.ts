// Diziler, array metotları vs.
import promptSync from "prompt-sync";
const prompt = promptSync();    

const products = [
    {
        id: 1,
        type: "Shoes",
        name: "Sneaker",
        stock: 10
    },
    {
        id: 2,
        type: "Outwear",
        name: "Jacket",
        stock: 5
    },
    {
        id: 2,
        type: "Outwear",
        name: "Jacket",
        stock: 5
    },
    {
        id: 2,
        type: "Outwear",
        name: "Jacket",
        stock: 5
    },
    {
        id: 2,
        type: "Outwear",
        name: "Jacket",
        stock: 5
    }
];

/*
for (let i = 0; i < products.length; i++) {
    console.log(products[i]);
}
for (const product of products) {
    console.log(product);  
}*/

//map metodu, çağırılan veriye özel yeni array açar
/*
const productIds = products.map(product => product.id);
console.log(productIds);
*/

interface Product {
    id: number;
    type: string;
    name: string;
    stock: number;
    price: number;
}

const productList: Product[] = [];
let nextId = 1;

const name = prompt("Ürün adı: ");
const type = prompt("Ürün tipi: ");
const stock = Number(prompt("Ürün stoğu: "));
const price = Number(prompt("Ürün fiyatı: "));

productList.push({
    id: nextId++,
    name: name,
    type: type,
    stock: stock,
    price: price
});

console.log(productList);







