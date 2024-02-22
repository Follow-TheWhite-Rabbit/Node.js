import { FileDB } from './index';

const fileDB = new FileDB();

// Регистрация схемы для таблицы
const newspostSchema = {
    id: 'number',
    title: 'string',
    text: 'string',
    createDate: 'Date'
};

fileDB.registerSchema('newspost', newspostSchema);

// Получение таблицы
const newspostTable = fileDB.getTable('newspost');

// Добавление записей
const data1 = {
  title: 'У зоопарку Чернігова лисичка народила лисеня',
  text: "В Чернігівському заопарку сталася чудова подія! Лисичка на ім'я Руда народила чудове лисенятко! Тож поспішайте навідатись та подивитись на це миле створіння!",
  createDate: new Date()
};

const data2 = {
  title: 'Новый рекорд по количеству посетителей в зоопарке',
  text: "Этим летом зоопарк Чернігова установил новый рекорд по количеству посетителей. Всего за один день парк посетило более 10 тысяч человек!",
  createDate: new Date()
};

const id1 = newspostTable.create(data1);
const id2 = newspostTable.create(data2);

// Вывод данных
console.log('All newsposts:', newspostTable.getAll());
console.log('Newspost with id 1:', newspostTable.getById(id1));
console.log('Updated newspost with id 1:', newspostTable.update(id1, { title: 'Маленька лисичка' }));
console.log('All newsposts after update:', newspostTable.getAll());
console.log('Deleted newspost with id 2:', newspostTable.delete(id2));
console.log('All newsposts after delete:', newspostTable.getAll());