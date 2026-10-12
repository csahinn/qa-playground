import promptSync from "prompt-sync";
import type { Product } from "../models/Product";

import { 
    addProduct as createProduct, 
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
} from "../services/ProductService";

import {
    validateText,
    validateInteger,
    validateDouble
} from "../validators/ProductValidator";

const prompt = promptSync();

export function startMenu(): void {
    let isRunning = true;

    while (isRunning) {
        // Menü seçenekleri

        console.log("\n=== Ürün Yönetim Sistemi ===");
        console.log("1. Ürün Ekle");
        console.log("2. Ürünleri Listele");
        console.log("3. Ürün Güncelle");
        console.log("4. Ürün Sil");
        console.log("5. Çıkış");

        const choice = prompt("Seçiminiz (1-5): ");

        if (choice === "1") {
            addProduct();

        } else if (choice === "2") {
            listProducts();

        } else if (choice === "3") {
            updateProduct();

        } else if (choice === "4") {
            deleteProduct();

        } else if (choice === "5") {
            isRunning = false;
            console.log("Çıkış yapılıyor...");

        } else {
        console.log("Geçersiz seçim. Lütfen tekrar deneyin.");   
    }
    }
}


//CREATE
function addProduct(): void {
    console.log("\n=== Ürün Ekle===");
    
    const name = prompt("Ürün adı: ");
    const category = prompt("Ürün kategorisi: ");
    const stockInput = prompt("Ürün stoğu: ");
    const priceInput = prompt("Ürün fiyatı: ");

    const errors: string[] = [];

    if (!validateInteger(stockInput)) {
        errors.push("ürün stok miktarı");
    }
    
    if (!validateDouble(priceInput)) {
        errors.push("ürün fiyatı");
    }
    
    if (!validateText(name)) {
        errors.push("ürün ismi");
    }
    
    if (!validateText(category)) {
        errors.push("ürün kategorisi");
    }
    
    if (errors.length > 0) {
        console.log(`Geçersiz giriş: ${errors.join(", ")}`);
        return;
    }

    try {
        const product = createProduct(
            name,
            category,
            Number(stockInput),
            Number(priceInput)
        );
        
        console.log(`Ürün başarıyla eklendi! ID: ${product.id}`);
    } catch (error) {
        console.log("Ürün oluşturulamadı.");
    }
}


//READ
function listProducts(): void {
    console.log("\n=== Ürün Listele ===");

    const products = getProducts();

    if(products.length === 0) {
        console.log("Henüz ürün eklenmedi.");
        prompt("\nAna menüye dönmek için Enter'a basın...");
        return;
    }

    for (const product of products) {
        console.log(
            `ID: ${product.id} | Ürün: ${product.name} | Kategori: ${product.category} | Stok: ${product.stock} | Fiyat: ${product.price}`
        );
    }

    const totalStock = products.reduce(
        (total, product) => total + product.stock,
        0
    );

    console.log(`\nToplam Stok Miktarı: ${totalStock}`);
    console.log(`\nToplam Ürün Çeşidi: ${products.length}`);

    prompt("\nAna menüye dönmek için Enter'a basın...");
}

//UPDATE - ÜRÜN ADI
function updateProductName(product: Product): void {
    const newName = prompt("Yeni ürün adı: ");

    if(!validateText(newName)) {
        console.log("Geçersiz ürün adı!");
        return;
    }

    const updated = updateProductById(product.id, {name: newName});

    console.log(updated ? "Ürün adı güncellendi." : "Ürün güncellenemedi.");
}

//UPDATE - ÜRÜN KATEGORİSİ
function updateProductCategory(product: Product): void {
    const newCategory = prompt("Yeni kategori: ");

    if (!validateText(newCategory)) {
        console.log("Geçersiz kategori!");
        return;
    }

    const updated = updateProductById(product.id, {category: newCategory});

    console.log(updated ? "Ürün kategorisi güncellendi." : "Ürün güncellenemedi");
}

//UPDATE - ÜRÜN STOĞU
function updateProductStock(product: Product): void {
    const stockInput = prompt("Yeni stok miktarı: ");

    if(!validateInteger(stockInput)) {
        console.log("Geçersiz stok miktarı!");
        return;
    }

    const updated = updateProductById(product.id, {stock: Number(stockInput)});

    console.log(updated ? "Ürün kategorisi güncellendi." : "Ürün güncellenemedi"); 
}

//UPDATE - ÜRÜN FİYATI
function updateProductPrice(product: Product): void {
    const priceInput = prompt("Yeni ürün fiyatı: ");

    if(!validateInteger(priceInput)) {
        console.log("Geçersiz ürün fiyatı!");
        return;
    }

    const updated = updateProductById(product.id, {price: Number(priceInput)});

    console.log(updated ? "Ürün kategorisi güncellendi." : "Ürün güncellenemedi"); 
}


//UPDATE MENÜSÜ
function updateProduct(): void {
    console.log("\n=== Ürün Güncelle ===");

    const id = Number(prompt("Güncellenecek ürün ID: "));
    const product = getProductById(id);

    if (!product) {
        console.log("Bu ID'ye sahip bir ürün bulunamadı!");
        prompt("\nAna menüye dönmek için Enter'a basın...");
        return;
    }

    console.log(`Ürün bulundu: ${product.name}`);

    while (true) {
        console.log("\n1. Ürün Adını Güncelle");
        console.log("2. Kategoriyi Güncelle");
        console.log("3. Stok Miktarını Güncelle");
        console.log("4. Fiyatı Güncelle");
        console.log("5. Geri Dön");

        const choice = prompt("Seçiminiz (1-5): ");

        if (choice === "1") {
            updateProductName(product);
        } else if (choice === "2") {
            updateProductCategory(product);
        } else if (choice === "3") {
            updateProductStock(product);
        } else if (choice === "4") {
            updateProductPrice(product);
        } else if (choice === "5") {
            console.log("Ana menüye dönülüyor...");
            return;
        } else {
            console.log("Geçersiz seçim. Lütfen tekrar deneyin.");
        }
    }
}

//DELETE

function deleteProduct(): void {
    console.log("\n=== Ürün Sil ===");

    const id = Number(prompt("Silinecek ürün ID: "));
    const product = getProductById(id);

    if (!product) {
        console.log("Bu ID'ye sahip bir ürün bulunamadı!");
        prompt("\nAna menüye dönmek için Enter'a basın...");
        return;
    }

    console.log(`Ürün bulundu: ${product.name}`);

    const response = prompt(
        "Bu ürünü silmek istediğinizden emin misiniz? (E/H): "
    ).trim().toUpperCase();

    if (response === "E") {
        const isDeleted = deleteProductById(id);

        console.log(isDeleted
            ? "Ürün başarıyla silindi!"
            : "Ürün silinemedi.");

    } else if (response === "H") {
        console.log("Silme işlemi iptal edildi.");
        return;
    } else {
        console.log("Hatalı giriş. Ana menüye dönülüyor...");
        return;
    }
}