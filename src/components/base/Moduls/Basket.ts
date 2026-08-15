import { IProduct } from '../../../types/index';

export class Basket {
  private savedProducts: IProduct[] = [];

  /**
   * Получение массива товаров, которые находятся в корзине
   */
  getSavedProducts(): IProduct[] {
    return this.savedProducts;
  }

  /**
   * Добавление товара, который был получен в параметре, в массив корзины
   */
  addSavedProducts(product: IProduct): void {
    if (!this.hasSavedProduct(product.id)) {
      this.savedProducts.push(product);
    }
  }

  /**
   * Удаление товара, полученного в параметре из массива корзины
   */
  deleteSavedProducts(product: IProduct): void {
    this.savedProducts = this.savedProducts.filter(
      savedProduct => savedProduct.id !== product.id
    );
  }

  /**
   * Очистка корзины
   */
  clearBasket(): void {
    this.savedProducts = [];
  }

  /**
   * Получение стоимости всех товаров в корзине
   */
  getSavedProductsPrice(): number {
    return this.savedProducts.reduce((total, product) => {
      return total + (product.price || 0);
    }, 0);
  }

  /**
   * Получение количества товаров в корзине
   */
  getSavedProductsLength(): number {
    return this.savedProducts.length;
  }

  /**
   * Проверка наличия товара в корзине по его id
   */
  hasSavedProduct(id: string): boolean {
    return this.savedProducts.some(product => product.id === id);
  }
}