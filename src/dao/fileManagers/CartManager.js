const fs = require('fs');

class CartManager {
    static id = 0; 

    constructor(path){
        this.path = path; 
        fs.writeFileSync(path, '[]')
    }

    async addCart(){
        
        const content = await  fs.promises.readFile(this.path, 'utf-8'); //leemos archivo
        const carts = JSON.parse(content); //convertimos archivo en objeto javascript 

        const cart = {id: ++CartManager.id, items: []}

        carts.push(cart); //agregamos Cart, argumento de la función 

        //antes de guardar el array hacemos JSON.stringify para convertir nuestro objeto en JSON 
        await fs.promises.writeFile(this.path, JSON.stringify(carts,null, '\t')); //escribimos el archivo
    }

    async getCart(id){
        const content = await  fs.promises.readFile(this.path, 'utf-8'); //leemos archivo
        const carts = JSON.parse(content); //convertimos archivo en objeto javascript 

        const cart = carts.find(i=>i.id == id) //buscamos un item con ese mismo id 

        return cart; 
    }

    async addItem(id, itemId){
        const content = await  fs.promises.readFile(this.path, 'utf-8'); //leemos archivo
        const carts = JSON.parse(content); //convertimos archivo en objeto javascript 

        const col_index = carts.findIndex(i=>i.id == id) //buscamos un item con ese mismo id 
        const cart = {...carts[col_index]}

        const index = cart.items.findIndex(i=>i.item == itemId)
        if(index >= 0){
            cart.items[index].quantity+=1;  
        }else{
            cart.items.push({item: itemId, quantity:1})
        }

        cart[col_index] = cart;
        await fs.promises.writeFile(this.path, JSON.stringify(carts,null, '\t')); //escribimos el archivo
    }

}

module.exports = CartManager; 