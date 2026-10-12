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

function validateText(inputText: string): boolean {
    if (inputText.trim() === "") {
        return false; 
    }
    return true;
}

function validateInteger(inputInteger: string): boolean {
    const integer = Number(inputInteger);

    return (
        inputInteger.trim() !== "" &&
        Number.isInteger(integer) &&
        integer >= 0
    )
}

function validateDouble(inputDouble: string): boolean {
    const double = Number(inputDouble);

    return (
        inputDouble.trim() !== "" &&
        Number.isFinite(double) &&
        double >= 0
    )
}

/* ÜRÜN EKLEME FONKSİYONU */

function addProduct() {
    console.log("\n=== Ürün Ekle ===");

    const name = prompt("Ürün adı: ");
    const category = prompt("Ürün tipi: ");

    const stockInput = prompt("Ürün stoğu: ");
    const stock = Number(stockInput);

    const priceInput = prompt("Ürün fiyatı: ");
    const price = Number(priceInput);

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
    

    productsList.push({
        id: nextId++,
        name: name,
        category: category,
        stock: stock,
        price: price
    });

    totalProduct = totalProduct + stock;
}

/* ÜRÜN LİSTELEME FONKSİYONU */

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

/* ÜRÜN GÜNCELLEME FONKSİYONU */

function updateProductName(product: Product) {
    const newName = prompt("Yeni ürün adı: ");
    if (!validateText(newName)) {
        console.log("Geçersiz isim girişi!");
        return;
    }
    product.name = newName;
    console.log("Ürün adı güncellendi. Lütfen kontrol edin.");
}

function updateProductCategory(product: Product) {
    const newCategory = prompt("Yeni kategori adı: ");
    if(!validateText(newCategory)) {
        console.log("Geçersiz kategori girişi!");
        return;
    }
    product.category = newCategory;
    console.log("Ürün kategorisi güncellendi. Lütfen kontrol edin.");
}

function updateProductStock(product: Product) {
    const newStock = prompt("Yeni stok miktarı: ");
        if(!validateInteger(newStock)) {
        console.log("Geçersiz stok miktarı girişi!");
        return;
    }
    product.stock = Number(newStock); 


    console.log("Ürün stoğu güncellendi. Lütfen kontrol edin.");
}

function updateProductPrice(product: Product) {
    const newPrice = prompt("Yeni ürün fiyatı: ");
    if (!validateDouble(newPrice)) {
        console.log("Geçersiz ürün fiyatı girişi!");
        return;
    }
    product.price = Number(newPrice); 

    console.log("Ürün fiyatı güncellendi. Lütfen kontrol edin.");
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


/* ÜRÜN SİLME FONKSİYONU */

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