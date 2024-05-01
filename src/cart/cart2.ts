import Product from "../products/Product";
import { CartProtocol2 } from "./contracts/cart.protocol";

type ITEM_CART = {
  product: Product,
  qtde: number
}

export default class Cart2 implements CartProtocol2<ITEM_CART>{
  private readonly _items: ITEM_CART[] = [];

  addItem(product: Product): void{
    //verificar se encontra item no array
    const index = this._items.findIndex((item)=>{
      return product === item.product
    })
    if(index != -1){//já existe no carrinho

      this._items[index] = {
        product,
        qtde: this._items[index].qtde+1
      }
      return;
    }
    this._items.push({
      product,
      qtde: 1
    })
    // [
    //   {
    //     product,
    //     0
    //   },
    //   {
    //     product,
    //     3
    //   }
    // ]
  }

  removeItem(product: Product): void{
    this._items.map((item, index)=>{
      if(product === item.product){
        this._items.splice(index, 1)
      }
    })
  }

  get items(): readonly ITEM_CART[]{
    return this._items
  }

  total(): number{
    let total = 0;

    this._items.map(item => {
      total += (item.product.price * item.qtde)
    })

    return total;
  }

  isEmpty(): boolean{
    return this._items.length === 0
  }

  clear(): void{
    this._items.length = 0;
   
  }

}
