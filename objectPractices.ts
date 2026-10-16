// Nested Objects

const order = {
    id: 1001,
    status: "PROCESSING",
    customer: {
        id: 42,
        firstName: "Eda",
        lastName: "Gun Sahin",
        address: {
            city: "Istanbul",
            district: "Kadikoy",
            postalCode: "34710"
        }
    },
    items: [ // brackets varsa burası bir array.
        {
            productId: 1,
            name: "Sneaker",
            quantity: 2,
            unitPrice: 2500
        },
        {
            productId: 5,
            name: "T-Shirt",
            quantity: 3,
            unitPrice: 750
        }
    ],
    payment: {
        method: "CREDIT_CARD",
        status: "PAID",
        transactionId: "TXN-2026-001"
    }
};
/*
console.log(order.status); // PROCESSING
console.log(order.customer.address.city); // Istanbul
console.table(order.items[0]); // Nesne içerisindeki arraye ulaşım

// Dot Notation ve Bracket notation
console.log(order.status);
console.log(order["status"]);

// İkisi de aynı sonucu verir ancak property ismi bir değişkende
// tutuluyorsa bracket notation kullanılabilir.
// Bu yöntem ileride dinamik API response kontrollerinde karşımıza çıkacak.

const field = "status";
console.log(order[field]);
*/

// Challenge 1: Order Response Inspection

// Yukarıdaki order nesnesini kullanarak aşağıdaki bilgileri konsola yazdır.
// 1. Müşterinin soyadı.
// 2. Teslimat ilçesi.
// 3. Siparişin ikinci ürününün adı.
// 4. İlk ürünün sipariş edilen adedi.
// 5. Ödemenin transaction ID'si.
/*
console.log(order.customer.lastName);
console.log(order.customer.address.district);
console.log(order.items[1].name);
console.log(order.items[0].quantity);
console.log(order.payment.transactionId);
*/
//--------------------------------------------------------------------------------
// Destructing

// Destructing bir nesnenin veya arrayin içindeki değerleri doğrudan değişkenlere
// aktarmamızı sağlar.
// Clean code kurallarından biri olan DRY = Don't Repeat Yourself mantığına göre
// kendini tekrar etmemen için veriyi değişkene alıp her yerde kullanmak daha iyi.
// aynı nesnenin özelliklerini çok sayıda yerde kullanıyorsan kod daha rahat okunur.

// 1. Object Destructing

// Normalde yapılan
/*
const firstName1 = order.customer.firstName;
const lastName2 = order.customer.lastName;
*/
// Destructing ikisini aynı satırda tanımlayabilir.
const { firstName, lastName } = order.customer;

// Önemli Not: Object Destructing, property isimlerine göre çalışır. Dolayısıyla
// firstName ve lastName, nesnedeki özelliklerle eşleşiyor.

// 2. Variable Renaming
// Peki ya nesnedeki id özelliğini başka isimle kullanmak istersek?

const { id: orderId, status: orderStatus } = order;

console.log(orderId);
console.log(orderStatus);

// Burada id: orderId şu anlama geliyor: Nesnedeki id özelliğini al orderId isimli 
// bir değişkene koy.

// 3. Nested Destructing
// İç içe nesnelerde de Destructing kullanılabilir:

const {
    customer: {
        address: {city, district}
    }
} = order;

console.log(city);
console.log(district);

// Burada city ve district değişkenleri oluşturulur. Ancak customer ve address isimli
// değişkenler oluşturulmaz.

// Array Destructing
// Dizilerde ise isimlere göre değil, elemanların sırasına göre çalışır:

const sizes = [40,41,42,43];
//const [firstSize,secondSize] = sizes;
// İlk elemanı atlamak istersek:

const [, secondSize] = sizes;
//console.log(firstSize);
console.log(secondSize);

// Destructing, Playwright'ta sıkça kullanılıyor. O yüzden öğrenilmesi gerekiyor.
