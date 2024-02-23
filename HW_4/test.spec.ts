import { Pocket, Card, Transaction, CurrencyEnum } from './index'; 

test('addCard and getCard methods', () => {
    const pocket = new Pocket(); // Создаем экземпляр класса Pocket
    const card = new Card(); // Создаем экземпляр класса Card

    // Добавляем карту в Pocket
    pocket.addCard('myCard', card);

    // Проверяем, что карта была добавлена
    expect(pocket.getCard('myCard')).toEqual(card);
});

test('removeCard method', () => {
    const pocket = new Pocket(); // Создаем экземпляр класса Pocket
    const card = new Card(); // Создаем экземпляр класса Card

    // Добавляем карту в Pocket
    pocket.addCard('myCard', card);

    // Удаляем карту из Pocket
    pocket.removeCard('myCard');

    // Проверяем, что карта была удалена
    expect(pocket.getCard('myCard')).toBeUndefined();
});

test('getTotalAmount method', () => {
    const pocket = new Pocket(); // Создаем экземпляр класса Pocket
    const card1 = new Card(); // Создаем первую карту
    const card2 = new Card(); // Создаем вторую карту

    // Добавляем транзакции на обе карты
    card1.addTransaction(new Transaction(100, CurrencyEnum.USD)); // Используйте конструктор Transaction
    card2.addTransaction(new Transaction(200, CurrencyEnum.USD)); // для создания транзакций

    // Добавляем карты в Pocket
    pocket.addCard('card1', card1);
    pocket.addCard('card2', card2);

    // Проверяем, что общая сумма транзакций равна 300
    expect(pocket.getTotalAmount(CurrencyEnum.USD)).toBe(300);
});