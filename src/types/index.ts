export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// Типы платежных систем
export type TPayment = 'card' | 'cash' | '';

// Интерфейс товара
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Интерфейс покупателя
export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

// Дополнительные типы, которые могут понадобиться позже
export type TProductCatalog = {
  products: IProduct[];
  selectedProduct: IProduct | null;
};

export type TBasket = {
  savedProducts: IProduct[];
};

// Типы для работы с сервером
export interface IProductResponse {
  items: IProduct[];
  total: number;
}

export interface IOrderData {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[]; // массив id товаров
}

export interface IOrderResponse {
  id: string;
  total: number;
}

// Интерфейс для класса Server
export interface IServer {
  getProducts(): Promise<IProductResponse>;
  postOrder(orderData: IOrderData): Promise<IOrderResponse>;
}