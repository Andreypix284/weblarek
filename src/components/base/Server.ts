import { IApi, IProductResponse, IOrderData, IOrderResponse } from '../../types/index';
import { IServer } from '../../types/index';

/**
 * Класс для взаимодействия с сервером
 * Отвечает за получение данных с сервера и отправку данных на сервер
 */
export class Server implements IServer {
  private api: IApi;

  /**
   * Конструктор класса Server
   * @param api - объект, соответствующий интерфейсу IApi
   */
  constructor(api: IApi) {
    this.api = api;
  }

  /**
   * Выполняет GET запрос на эндпоинт /product/
   * @returns Promise с объектом, содержащим массив товаров
   */
  async getProducts(): Promise<IProductResponse> {
    try {
      const response = await this.api.get<IProductResponse>('/product/');
      return response;
    } catch (error) {
      console.error('Ошибка при получении товаров с сервера:', error);
      throw error;
    }
  }

  /**
   * Выполняет POST запрос на эндпоинт /order/
   * @param orderData - данные о покупателе и выбранных товарах
   * @returns Promise с объектом, подтверждающим покупку
   */
  async postOrder(orderData: IOrderData): Promise<IOrderResponse> {
    try {
      const response = await this.api.post<IOrderResponse>('/order/', orderData);
      return response;
    } catch (error) {
      console.error('Ошибка при отправке заказа на сервер:', error);
      throw error;
    }
  }
}