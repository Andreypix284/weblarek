import { IBuyer, TPayment } from '../../../types/index';

export class Buyer {
  private payment: TPayment = '';
  private address: string = '';
  private phone: string = '';
  private email: string = '';

  /**
   * Сохранение данных о методе оплаты
   */
  savePayment(method: TPayment): void {
    this.payment = method;
  }

  /**
   * Сохранение данных об адресе
   */
  saveAddress(address: string): void {
    this.address = address;
  }

  /**
   * Сохранение данных об email
   */
  saveEmail(email: string): void {
    this.email = email;
  }

  /**
   * Сохранение данных о номере телефона
   */
  savePhone(phone: string): void {
    this.phone = phone;
  }

  /**
   * Получение всех данных покупателя
   */
  getCustomerData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address
    };
  }

  /**
   * Очистка данных покупателя
   */
  clearCustomerData(): void {
    this.payment = '';
    this.address = '';
    this.phone = '';
    this.email = '';
  }

  /**
   * Валидация данных покупателя
   * Проверяет, что все поля заполнены
   */
  validateData(): boolean {
    // Проверяем, что способ оплаты выбран
    if (this.payment === '') {
      console.warn('Способ оплаты не выбран');
      return false;
    }

    // Проверяем заполненность обязательных полей
    if (!this.address.trim()) {
      console.warn('Адрес не заполнен');
      return false;
    }

    if (!this.phone.trim()) {
      console.warn('Телефон не заполнен');
      return false;
    }

    // Проверяем валидность email (базовая проверка)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email.trim() || !emailRegex.test(this.email)) {
      console.warn('Email не валидный или не заполнен');
      return false;
    }

    return true;
  }
}