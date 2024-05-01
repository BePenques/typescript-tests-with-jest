import Product from "./Product"
import ProductRepositoryInterface from "./contracts/product.interface"
import ProductController from "./product.controller"

const makeSut = ()=>{
  // class ProductRepositorySQL implements ProductRepositoryInterface{
  //   findAll(): Product[]{
  //     return []
  //   }
  //   save(name: string, price: number): Product{
  //     throw new Error('not implemented')
  //   }
  // }
  
  const mockRepository: jest.Mocked<ProductRepositoryInterface> = {
    findAll: jest.fn(),
    save: jest.fn(),
  }

  const sut = new ProductController(mockRepository)//new ProductRepositorySQL

  return {
    sut,
    mockRepository
  }
}
describe('ProductController', ()=>{
  it('should return all products', ()=>{
    const {sut, mockRepository} = makeSut()//new ProductController()
    sut.getAll()
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1)//garante que só foi chamado 1 vez
  })
  it('should save product', ()=>{
    const {sut, mockRepository} = makeSut()
    const name = 'prod1'
    const price = 12
    sut.store(name, price)
    expect(mockRepository.save).toHaveBeenCalledTimes(1)//garante que só foi chamado 1 vez
    expect(mockRepository.save).toHaveBeenCalledWith(name,price)//garante que só foi chamado 1 vez
  })
})
