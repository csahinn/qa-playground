import type { Product } from "../models/Product";
import { validateText,
         validateInteger,
         validateDouble } from "../validators/ProductValidator";



const products: Product[] = [];
let nextId = 1;

export function addProduct(
    name: string,
    category: string,
    stock: number,
    price: number
): Product {

    const newProduct: Product = {
        id: nextId++,
        name,
        category,
        stock,
        price
    };

    products.push(newProduct);

    return newProduct;
}

export function getProducts(): Product[] {
    return products;
}

export function getProductById(id: number): Product | undefined {
    const product = products.find(product => product.id === id);
    return product;
}

export function deleteProductById(id: number): boolean {
    const index = products.findIndex(product => product.id === id)

    if (index === -1) {
        return false;
    }

    products.splice(index, 1);

    return true;
}

type ProductUpdate = Partial<Omit<Product, "id">>;

export function updateProductById(
    id: number,
    changes: ProductUpdate
    ): boolean {
        
    const product = products.find(product => product.id === id);

    if (!product) {
            return false;
        }

    if (changes.name !== undefined && !validateText(changes.name)) {
        return false;
    }

    if (changes.category !== undefined && !validateText(changes.category)) {
        return false;
    }

    if (changes.stock !== undefined && !validateInteger(String(changes.stock))) {
        return false;
    }

    if (changes.price !== undefined && !validateDouble(String(changes.price))) {
        return false;
    }

    Object.assign(product, changes);

    return true;
}