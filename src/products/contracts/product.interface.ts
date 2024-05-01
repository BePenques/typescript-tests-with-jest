import Product from "../Product";

export default interface ProductRepositoryInterface{
  findAll(): Product[];
  save(name: string, price: number): Product;
}
