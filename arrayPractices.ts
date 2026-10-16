//ürünler için bir dizi oluşturalım. burada array metotlarını öğreneceğiz.

const products = [
    { id: 1, name: "Sneaker",  category: "Shoes",       stock: 15, price: 2500 },
    { id: 2, name: "Hoodie",   category: "Clothing",    stock: 8,  price: 1800 },
    { id: 3, name: "Boot",     category: "Shoes",       stock: 0,  price: 4200 },
    { id: 4, name: "Backpack", category: "Accessories", stock: 12, price: 1500 },
    { id: 5, name: "T-Shirt",  category: "Clothing",    stock: 25, price: 750 },
    { id: 6, name: "Loafer",   category: "Shoes",       stock: 4,  price: 3500 },
    { id: 7, name: "Watch",    category: "Accessories", stock: 0,  price: 6000 },
    { id: 8, name: "Jacket",   category: "Clothing",    stock: 6,  price: 4800 }
]

// *******************************************************
// ******************* MAP() METODU **********************
// *******************************************************
// map(), bir array'in bütün elemanlarını gezer ve her elemandan ürettiğin sonuçlarla
// yeni bir array oluşturur.

const result = products.map (product => product.name);

// Buradaki product => product.name bir callback fonksiyonudur. map() her ürün için bu
// fonksiyonu çalıştırır. Orijinal array değişmez.

// 1.soru: Ürün isimlerini değil, ürünlerin ID ve fiyat bilgilerini içeren yeni bir
// object array oluştur.
/*
const productPrices = products.map(product => ({
    id: product.id,
    price: product.price
}));

console.log(productPrices);
*/
//NOT: Object oluştur dendiğinde iki nokta ile "id: " vb. yazıyoruz.

// *******************************************************
// ****************** FILTER() METODU ********************
// *******************************************************
// filter(), bir array içerisindeki belirli koşulu sağlayan elemanları seçerek yeni bir 
// array oluşturur.
/*
const availableProducts = products.filter(
    product => product.stock > 0 && 
    product.price > 3000 && 
    product.category === "Shoes"
);

console.log(availableProducts);
*/
// *******************************************************
// *********** FIND() VE FINDINDEX() METODLARI ***********
// *******************************************************
// Bu ikisi ve filter metotları arasındaki fark, filter eşleşen bütün elemanlardan bir 
// array oluştururken find() ilk eşleşen elemanı bulur, bulamazsa undefined döner.
// findindex() ise ilk eşleşen elemanın indexini verir. bulamazsa -1 döner.
// filter'ın koşullarına uyan hiç eleman yoksa [] döner.
/*
const findProduct = products.find(p => p.price > 4000);
console.log (findProduct);

const findIndexOfProduct = products.findIndex(p => p.stock === 0);
console.log (findIndexOfProduct);
*/
// *******************************************************
// ************* SOME() VE EVERY() METODLARI *************
// *******************************************************
// Bu iki metot birer array döndürmez. ikisinin dönüş tipi boolean'dır.
// some(), en az bir eleman ilgili koşulu sağlıyorsa true döner.
// every(), bütün eleman ilgili koşulu sağlıyorsa true döner.

const isNoStock = products.some(p => p.stock === 0);
console.log(isNoStock);

const isMoreThanFive = products.every(p => p.price > 500);
console.log(isMoreThanFive);

// *******************************************************
// ******************* REDUCE() METODU *******************
// *******************************************************
// reduce() metodu, bir dizideki elemanları işleyerek tek bir sonuç üretmemizi sağlar.
// Bu sonuç sayı, string, object veya başka bir veri yapısı olabilir.

/*
const totalInventoryValue = products.reduce((accumulator, product) => {
    return accumulator + (product.price * product.stock);
}, 0);

console.log(totalInventoryValue);
*/

// *******************************************************
// ******************** SORT() METODU ********************
// *******************************************************
// map(), filter() ve reduce() orijinal diziyi değiştirmeden yeni dizi oluştururken
// sort() yeni dizi oluşturmaz ve mevcut diziyi değiştirir. Sıralama yapmayı sağlar.
// örneğin fiyatları küçükten büyüğe sıralamak istersek,
// products.sort((a,b) => a.price - b.price);
// buradaki sonuç negatifse a, b'den önce gelir.
// pozitifse b, a'dan önce gelir.
// sıfırsa mevcut sıraları korunur.
// ancak yukarıdaki koddan sonra products dizisinin sırası değişmiş olur.
// bunu engellemek için dizinin kopyası üzerinde çalışabiliriz.

const copiedProducts = [...products];

/*
const sortedProducts = [...products].sort((a, b) => b.price - a.price);

console.log(JSON.stringify(sortedProducts, null, 2));

console.table(sortedProducts); */

// *******************************************************
// ************ SLICE() ve SPLICE() METOTLARI ************
// *******************************************************

// slice() fonksiyonu belirlenen indexlerin aralığındaki elemanlardan yeni bir
// dizi oluşturur. ilk verilen index dahil, son verilen hariçtir.

// splice() metodu ise diziden eleman silebilir, ekleyebilir veya değiştirebilir.
// Üstelik yeni dizi oluşturmaz, mevcut diziyi değiştirir.
/*
const firstThreeProducts = [...products].slice(0,3);
console.table(firstThreeProducts); 


const removedProducts = copiedProducts.splice(2,1);
console.table(copiedProducts);
console.table(products);
*/ 
// *******************************************************
// ****************** INCLUDES() METODU ******************
// *******************************************************

// includes() metodu, bir dizinin belirli bir değeri içerip içermediğini kontrol 
// eder. Sonuç boolean olur.
// Not: Includes() nesnelerin içindeki alanları kendiliğinden aramaz. Nesneleri
// referanslarına göre karşılaştırır. Bir ürünün id'sini kontrol etmek istiyorsak
// some() daha uygundur.

// *******************************************************
// ******************* FOREACH() METODU ******************
// *******************************************************

// forEach() metodu, dizinin her elemanı için bir fonksiyon çalıştırır. map()
// fonksiyonu gibi yeni bir sonuç dizisi oluşturmaz, dönüş değeri undefined'dır.
// Özellikle loglama gibi işlemlerde kullanışlıdır.

// *******************************************************
// *********-********* FLATMAP() METODU ******************
// *******************************************************

// flatMap(), önce her elemanı döndürür, sonra sonucu bir seviye düzleştirir.

// Challenge 8
/*
const sampleArray = ["Shoes","Clothing","Accessories"];

console.log(sampleArray.includes("Clothing"));
console.log(sampleArray.includes("Electronics"));

products.forEach(product => {
    console.log(`${product.name}: ${product.price} TL`);
});

const orders = [
    { orderId: 101, productIds: [1, 2] },
    { orderId: 102, productIds: [3, 5, 7] },
    { orderId: 103, productIds: [4, 8] }
];

const allProductIds = orders.flatMap(order => order.productIds);

console.log(allProductIds);

const availableProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .filter(p => p.stock > 0)
    .map(p => p.name);

console.log(JSON.stringify(availableProducts,null,2));
*/
/*

// DOĞRU ÇALIŞIYOR AMA DÜZELTİLMESİ GEREKEN ŞEYLER VAR.
// lowStockProducts değişkeninin değeri undefined. 
// Neden? Çünkü forEach() geriye bir array döndürmez. Dönüş değeri
// her zaman undefined olur. Bunun olayı şu, sonuç console.log'da doğru
// gelse de başka bir zaman kullanılmak istendiğinde undefined döner.
// çektiğimiz verinin hafızada tutmak için değişkene atanması gerekir.

const lowStockProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .filter(p => p.stock <= 10 && p.stock >= 1)
    .forEach(p => {
        console.log(`${p.name} → ${p.price} TL`)
    });

*/
//DOĞRU
const lowStockProducts = products
    .filter(p => p.stock >= 1 && p.stock <= 10)
    .sort((a, b) => b.price - a.price);

lowStockProducts.forEach(p => {
    console.log(`${p.name} → ${p.price} TL`);
});

const totalShoesValue = products
    .filter(p => p.category === "Shoes")
    .reduce((acc, p) => {
        return acc + p.price * p.stock; }, 0);

console.log(totalShoesValue);

const hasInvalidProduct = products.some(p => p.price <= 0 || p.stock < 0);

console.log(hasInvalidProduct);


// *******************************************************
// ******************** SORT() METODU ********************
// *******************************************************
// map(), filter() ve reduce() orijinal diziyi değiştirmeden yeni dizi oluştururken
// sort() yeni dizi oluşturmaz ve mevcut diziyi değiştirir. Sıralama yapmayı sağlar.
// örneğin fiyatları küçükten büyüğe sıralamak istersek,
// products.sort((a,b) => a.price - b.price);
// buradaki sonuç negatifse a, b'den önce gelir.
// pozitifse b, a'dan önce gelir.
// sıfırsa mevcut sıraları korunur.
// ancak yukarıdaki koddan sonra products dizisinin sırası değişmiş olur.
// bunu engellemek için dizinin kopyası üzerinde çalışabiliriz.

// const copiedProducts = [...products];      

/*
const sortedProducts = [...products].sort((a, b) => b.price - a.price);

console.log(JSON.stringify(sortedProducts, null, 2));

console.table(sortedProducts); */

/* 
İLK 11

 GK - 33 - Ederson
 RB - 22 - Ognjen Mimovic
 CB - 31 - Milan Skriniar
 CB - 
 LB - 24 - Archie Brown
CDM - 35 - N'Golo Kante
 CM -
CAM - 30 - Marco Asensio
 RW - 24 - Mason Greenwood
 LW - 26 - Oğuz Aydın
 ST -

 Yaş ortalaması: 28.1

YEDEKLER
 GK - 29 - Tarık Çetin
 RB - 25 - Taha Şahin
 LB - 25 - Levent Mercan
 CB - 22 - Kojo Oppong
 CB - 25 - Jayden Oosterwolde
CDM - 23 - Bartuğ Elmaz
 CM - 
 LW -
 RW -
 ST -


 26/27 Yabancı kuralı: 4 adet U23, 10 adet yaş sınırsız.
 27/28 Yabancı kuralı: 6 adet U25,  8 adet yaş sınırsız.
 28/29 Yabancı kuralı: 8 adet U25,  6 adet yaş sınırsız.
*/