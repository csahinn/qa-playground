// Değişkenler, basit fonksiyonlar

const productName = "Sneaker";
let oldStock = 10;
let newStock: number = oldStock;
let isAvailable = true;

function buyProduct(order: number) {
        if (order > oldStock) {
            isAvailable = false;
            console.log("Product stock is not enough for this order.");
            return oldStock;
        }

        if (oldStock === 0) {
            isAvailable = false;
            console.log("Product is out of stock.");
            return oldStock;
        }

        oldStock = oldStock - order;
        newStock = oldStock;

        if (newStock === 0) {
            isAvailable = false;
            console.log("Product is out of stock.");
        } else {
            isAvailable = true;
            console.log("Order completed.");
        }
    return newStock;
}

buyProduct(19);

console.log(productName);
console.log(newStock);
console.log(isAvailable);
