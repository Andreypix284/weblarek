import { IBuyer, TPayment } from '../../types/index';

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
  validate(): TErrors {
    const errors: TErrors = {};

    if (!this.payment) {
      errors.payment = 'Необходимо выбрать способ оплаты';
    }

    if (!this.email?.trim()) {
      errors.email = 'Необходимо указать email';
    }

    if (!this.phone?.trim()) {
      errors.phone = 'Необходимо указать телефон';
    }

    if (!this.address?.trim()) {
      errors.address = 'Необходимо указать адрес';
    }

    return errors;
  }
}

type TErrors = Partial<Record<keyof IBuyer, string>>;