import { CurrencyEnum, Transaction } from './index';

interface ICard {
    transactions: Transaction[];

    addTransaction(transaction: Transaction): string;
    addTransaction(currency: CurrencyEnum, amount: number): string;

    getTransaction(id: string): Transaction | undefined;

    getBalance(currency: CurrencyEnum): number;
}

export default ICard;