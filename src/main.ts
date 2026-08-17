import './scss/styles.scss';

// Импортируем классы моделей 
import { ProductCatalog } from './components/Models/ProductCatalog';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';

// Импортируем класс Server и Api
import { Server } from './components/Server';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';

// Импортируем тестовые данные
import { apiProducts } from './utils/data';

// ============================================

// 1. ТЕСТИРОВАНИЕ КЛАССА PRODUCT CATALOG
console.log('========== ТЕСТИРОВАНИЕ PRODUCT CATALOG ==========');

// Создаем экземпляр класса ProductCatalog
const productCatalog = new ProductCatalog();

// Проверяем метод saveProducts - сохранение товаров
console.log('1.1 Сохранение товаров в каталог...');
productCatalog.saveProducts(apiProducts.items);
console.log('Товары сохранены в каталог');

// Проверяем метод getProducts - получение всех товаров
console.log('1.2 Получение всех товаров из каталога:');
const allProducts = productCatalog.getProducts();
console.log('Все товары:', allProducts);
console.log(`Количество товаров в каталоге: ${allProducts.length}`);

// Проверяем метод getProductId - получение товара по id
console.log('1.3 Получение товара по ID:');
if (allProducts.length > 0) {
  const productId = allProducts[0].id;
  const foundProduct = productCatalog.getProductId(productId);
  console.log(`Товар с ID "${productId}":`, foundProduct);
} else {
  console.log('Нет товаров для проверки метода getProductId');
}

// Проверяем метод getProductId с несуществующим ID
console.log('1.4 Проверка поиска по несуществующему ID:');
const nonExistentProduct = productCatalog.getProductId('non-existent-id');
console.log('Результат поиска несуществующего ID:', nonExistentProduct);

// Проверяем метод setSelectedProduct - сохранение выбранного товара
console.log('1.5 Сохранение выбранного товара:');
if (allProducts.length > 0) {
  const selectedProduct = allProducts[0];
  productCatalog.setSelectedProduct(selectedProduct);
  console.log(`Выбранный товар сохранен: "${selectedProduct.title}"`);
}

// Проверяем метод getSelectedProduct - получение выбранного товара
console.log('1.6 Получение выбранного товара:');
const selected = productCatalog.getSelectedProduct();
console.log('Товар для подробного отображения:', selected);

// ============================================


// 2. ТЕСТИРОВАНИЕ КЛАССА BASKET
console.log('========== ТЕСТИРОВАНИЕ BASKET ==========');

// Создаем экземпляр класса Basket
const basket = new Basket();

// Проверяем getSavedProducts - получение товаров из корзины (изначально пусто)
console.log('2.1 Начальное состояние корзины:');
const initialBasket = basket.getSavedProducts();
console.log('Товары в корзине:', initialBasket);
console.log(`Количество товаров в корзине: ${basket.getSavedProductsLength()}`);

// Проверяем addSavedProducts - добавление товаров в корзину
console.log('2.2 Добавление товаров в корзину:');
if (allProducts.length >= 2) {
  basket.addSavedProducts(allProducts[0]);
  basket.addSavedProducts(allProducts[1]);
  console.log(`Добавлены товары: "${allProducts[0].title}" и "${allProducts[1].title}"`);

  // Проверяем добавление дубликата (не должен добавиться)
  console.log('2.3 Попытка добавить дубликат товара:');
  basket.addSavedProducts(allProducts[0]);
  console.log('Количество товаров после попытки добавления дубликата:', basket.getSavedProductsLength());
}

// Проверяем getSavedProducts после добавления
console.log('2.4 Товары в корзине после добавления:');
console.log('Товары:', basket.getSavedProducts());
console.log(`Количество товаров в корзине: ${basket.getSavedProductsLength()}`);

// Проверяем getSavedProductsPrice - получение общей стоимости
console.log('2.5 Общая стоимость корзины:');
const totalPrice = basket.getSavedProductsPrice();
console.log(`Общая стоимость: ${totalPrice} рублей`);

// Проверяем hasSavedProduct - проверка наличия товара
console.log('2.6 Проверка наличия товара в корзине:');
if (allProducts.length > 0) {
  const firstProductId = allProducts[0].id;
  const hasProduct = basket.hasSavedProduct(firstProductId);
  console.log(`Товар с ID "${firstProductId}" в корзине: ${hasProduct ? 'Да' : 'Нет'}`);

  // Проверяем несуществующий товар
  const hasNonExistent = basket.hasSavedProduct('non-existent');
  console.log(`Товар с несуществующим ID в корзине: ${hasNonExistent ? 'Да' : 'Нет'}`);
}

// Проверяем deleteSavedProducts - удаление товара из корзины
console.log('2.7 Удаление товара из корзины:');
if (allProducts.length > 0) {
  const productToDelete = allProducts[0];
  basket.deleteSavedProducts(productToDelete);
  console.log(`Удален товар: "${productToDelete.title}"`);
  console.log('Товары в корзине после удаления:', basket.getSavedProducts());
  console.log(`Количество товаров в корзине: ${basket.getSavedProductsLength()}`);
}

// Проверяем clearBasket - очистка корзины
console.log('2.8 Очистка корзины:');
basket.clearBasket();
console.log('Корзина очищена');
console.log('Товары в корзине после очистки:', basket.getSavedProducts());
console.log(`Количество товаров в корзине: ${basket.getSavedProductsLength()}`);

// ============================================


// 3. ТЕСТИРОВАНИЕ КЛАССА BUYER
console.log('========== ТЕСТИРОВАНИЕ BUYER ==========');

// Создаем экземпляр класса Buyer
const buyer = new Buyer();

// Проверяем начальное состояние покупателя
console.log('3.1 Начальное состояние покупателя:');
console.log('Данные покупателя:', buyer.getCustomerData());

// Проверяем savePayment - сохранение метода оплаты
console.log('3.2 Сохранение метода оплаты:');
buyer.savePayment('card');
console.log('Метод оплаты сохранен: card');

// Проверяем saveAddress - сохранение адреса
console.log('3.3 Сохранение адреса:');
buyer.saveAddress('ул. Тестовая, д. 1, кв. 5');
console.log('Адрес сохранен: ул. Тестовая, д. 1, кв. 5');

// Проверяем saveEmail - сохранение email
console.log('3.4 Сохранение email:');
buyer.saveEmail('test@example.com');
console.log('Email сохранен: test@example.com');

// Проверяем savePhone - сохранение телефона
console.log('3.5 Сохранение телефона:');
buyer.savePhone('+7 (999) 123-45-67');
console.log('Телефон сохранен: +7 (999) 123-45-67');

// Проверяем getCustomerData - получение всех данных
console.log('3.6 Получение всех данных покупателя:');
const customerData = buyer.getCustomerData();
console.log('Данные покупателя:', customerData);

// Проверяем validate - валидация данных (должна пройти успешно)
console.log('3.7 Валидация данных (успешная):');
const errors = buyer.validate();
const isValid = Object.keys(errors).length === 0;
console.log(`Данные валидны: ${isValid ? 'Да' : 'Нет'}`);
if (!isValid) {
  console.log('Ошибки валидации:', errors);
}

// Проверяем валидацию с неполными данными
console.log('3.8 Валидация данных (неуспешная):');
// Создаем нового покупателя с неполными данными
const invalidBuyer = new Buyer();
invalidBuyer.savePayment('');
invalidBuyer.saveAddress('');
invalidBuyer.saveEmail('invalid-email');
invalidBuyer.savePhone('');
console.log('Данные невалидного покупателя:', invalidBuyer.getCustomerData());
const invalidErrors = invalidBuyer.validate();
const isInvalidValid = Object.keys(invalidErrors).length === 0;
console.log(`Данные валидны: ${isInvalidValid ? 'Да' : 'Нет (ожидаемо)'}`);
if (!isInvalidValid) {
  console.log('Ошибки валидации:', invalidErrors);
}

// Проверяем clearCustomerData - очистка данных покупателя
console.log('3.9 Очистка данных покупателя:');
buyer.clearCustomerData();
console.log('Данные после очистки:', buyer.getCustomerData());

// ============================================

// 4. РАБОТА С СЕРВЕРОМ
console.log('========== РАБОТА С СЕРВЕРОМ ==========');

// Создаем экземпляр класса Api
const api = new Api(API_URL);

// Создаем экземпляр класса Server
const server = new Server(api);

// Выполняем запрос на сервер для получения товаров
console.log('4.1 Выполнение GET запроса на сервер для получения товаров...');

server.getProducts()
  .then(response => {
    console.log('Ответ сервера:', response);

    // Сохраняем полученные товары в каталог
    console.log('4.2 Сохранение полученных товаров в каталог...');
    productCatalog.saveProducts(response.items);

    // Выводим сохраненный каталог в консоль
    console.log('4.3 Каталог после сохранения данных с сервера:');
    const productsFromServer = productCatalog.getProducts();
    console.log('Товары из каталога:', productsFromServer);
    console.log(`Количество товаров в каталоге: ${productsFromServer.length}`);

    console.log('Данные с сервера успешно сохранены в каталог!');
  })
  .catch(error => {
    console.error('Ошибка при получении товаров с сервера:', error);
  });


// ИТОГОВЫЙ ОТЧЕТ
console.log('========== ИТОГОВЫЙ ОТЧЕТ ПО ТЕСТИРОВАНИЮ ==========');
console.log(' Все классы созданы и работают независимо');
console.log(' ProductCatalog - управление товарами');
console.log(' Basket - управление корзиной');
console.log(' Buyer - управление данными покупателя');
console.log('Server - взаимодействие с сервером');
console.log(' Модели данных полностью самостоятельны');

