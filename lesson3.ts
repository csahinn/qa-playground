import promptSync from "prompt-sync";
const prompt = promptSync();  

interface Product {
    id: number;
    category: string;
    name: string;
    stock: number;
    price: number;
}

const productsList: Product[] = [];
let nextId = 1;
let isRunning = true;
let totalProduct = 0;

while (isRunning) {
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

function addProduct() {
    console.log("\n=== Ürün Ekle ===");

    const name = prompt("Ürün adı: ");
    const category = prompt("Ürün tipi: ");
    const stock = Number(prompt("Ürün stoğu: "));
    const price = Number(prompt("Ürün fiyatı: "));

    productsList.push({
        id: nextId++,
        name: name,
        category: category,
        stock: stock,
        price: price
    });

    totalProduct = totalProduct + stock;
}

function listProducts() {
    console.log("\n=== Ürün Listele ===");

    if (productsList.length === 0) {
        console.log("Henüz ürün eklenmedi.");
        prompt("\nAna menüye dönmek için Enter'a basın.");
        return;
    }

    for (const product of productsList) {
        console.log(
            `ID: ${product.id} | Ürün: ${product.name} | Kategori: ${product.category} | Stok: ${product.stock} | Fiyat: ${product.price} TL`
        );
    }

    const totalStock = productsList.reduce (
        (total, product) => total + product.stock, 0
    );

    console.log("\nToplam Stok Miktarı: "+totalStock);
    console.log("Toplam Ürün Çeşidi: "+ productsList.length);

    prompt("\nAna menüye dönmek için Enter'a basın...");
}

function updateProductName(product: Product) {
    const newName = prompt("Yeni ürün adı: ");
    product.name = newName;
    console.log("Ürün adı güncellendi. Lütfen kontrol edin.");
}

function updateProductCategory(product: Product) {
    const newCategory = prompt("Yeni kategori adı: ");
    product.category = newCategory;
    console.log("Ürün kategorisi güncellendi. Lütfen kontrol edin.");
}

function updateProductStock(product: Product) {
    const newStock = Number(prompt("Yeni stok miktarı: "));
    product.stock = newStock; 
    console.log("Ürün stoğu güncellendi. Lütfen kontrol edin.");
}

function updateProductPrice(product: Product) {
    const newPrice = Number(prompt("Yeni ürün fiyatı: "));
    product.price = newPrice; 
    console.log("Ürün stoğu güncellendi. Lütfen kontrol edin.");
}

function updateProduct() {
    console.log("\n=== Ürün Güncelle ===");

    const id = Number(prompt("Güncellenecek ürün ID: "));
    const product = productsList.find(product => product.id === id);

    if (!product) {
        console.log("Bu ID'ye sahip bir ürün bulunamadı!");
        prompt("\n Ana menüye dönmek için Enter'a basın...");
        return;
    }

    console.log(`Ürün bulundu: ${product.name}`);

    while (isRunning) {
        console.log("1. Ürün Adını Güncelle");
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

function deleteProduct() {
    console.log("\n=== Ürün Sil ===");

    const id = Number(prompt("Silinecek ürün ID: "));
    const index = productsList.findIndex(product => product.id === id);

    if(index === -1) {
        console.log("Bu ID'ye sahip bir ürün bulunamadı!");
        prompt("\n Ana menüye dönmek için Enter'a basın...");
        return;
    }
    console.log(`Ürün bulundu: ${productsList[index].name}`);

    const response = prompt(
        "Bu ürünü silmek istediğinizden emin misiniz? (E/H): "
    ).trim().toUpperCase();


    if (response === "E") {
        productsList.splice(index, 1);
        console.log("Ürün başarıyla silindi!");
    }
    else if (response === "H") {
        return;
    } else {
        console.log("Hatalı bir giriş yaptınız. Ana menüye dönülüyor...");
        return;
    }

}