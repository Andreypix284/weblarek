import { IProduct } from '../../../types/index';

export class ProductCatalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  /**
   * Сохранение массива товаров полученного в параметрах метода
   */
  saveProducts(productsArray: IProduct[]): void {
    this.products = productsArray;
  }

  /**
   * Получение массива товаров из модели
   */
  getProducts(): IProduct[] {
    return this.products;
  }

  /**
   * Получение одного товара по его id
   */
  getProductId(id: string): IProduct | undefined {
    return this.products.find(product => product.id === id);
  }

  /**
   * Сохранение товара для подробного отображения
   */
  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  /**
   * Получение товара для подробного отображения
   */
  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}