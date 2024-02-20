import { Card, Transaction, CurrencyEnum } from './index'; 


const card = new Card();

const transaction1: Transaction = new Transaction(100, CurrencyEnum.USD);
const transaction2: Transaction = new Transaction(200, CurrencyEnum.UAH);

card.addTransaction(transaction1);
card.addTransaction(transaction2);

console.log('Balance in USD:', card.getBalance(CurrencyEnum.USD)); // Ожидаем 100
console.log('Balance in UAH:', card.getBalance(CurrencyEnum.UAH)); // Ожидаем 200

console.log('Transaction with id 1:', card.getTransaction('1'));