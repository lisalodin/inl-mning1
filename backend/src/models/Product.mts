// Denna klass finns för att skapa nya produkter. En produkt representeras av tre egenskaper: id, name och price

export class Product {
    id: number;
    name: string;
    price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}