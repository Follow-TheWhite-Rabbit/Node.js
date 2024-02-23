import { Card, Transaction, CurrencyEnum } from './index'; 

test('function', () => {
    const card = new Card();

    const transaction1: Transaction = new Transaction(100, CurrencyEnum.USD);
    const transaction2: Transaction = new Transaction(200, CurrencyEnum.UAH);

    card.addTransaction(transaction1);
    card.addTransaction(transaction2);

    expect(card.getBalance(CurrencyEnum.USD)).toBe(100);
    expect(card.getBalance(CurrencyEnum.UAH)).toBe(200);
    expect(card.getTransaction(transaction1.id)).toEqual(transaction1);
});