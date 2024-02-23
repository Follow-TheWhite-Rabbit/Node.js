import { v4 as uuidv4 } from 'uuid';
import ICard from './ICard';



export enum CurrencyEnum {
    USD = 'USD',
    UAH = 'UAH'
}

export class Transaction  {
    id: string;
    amount: number;
    currency: CurrencyEnum;

    constructor(amount: number, currency: CurrencyEnum) {
        this.id = uuidv4();
        this.amount = amount;
        this.currency = currency;
    }
}

export class Card implements ICard {
    transactions: Transaction[];

    constructor() {
        this.transactions = [];
    }

    addTransaction(transaction: Transaction): string;
    addTransaction(currency: CurrencyEnum, amount: number): string;

   
    addTransaction(arg1: CurrencyEnum | Transaction, arg2?: number): string {
        if (arg1 instanceof Transaction) {
            this.transactions.push(arg1);
            return arg1.id;
        } else if (typeof arg1 === 'number' && arg2 !== undefined) {
            const transaction = new Transaction(arg2, arg1);
            this.transactions.push(transaction);
            return transaction.id;
        } else {
            throw new Error('Invalid arguments for addTransaction');
        }
    }

    getTransaction(id: string): Transaction | undefined {
        return this.transactions.find(transaction => transaction.id === id)
    }

    getBalance(currency: CurrencyEnum): number {
        let totalBalance = 0;

        this.transactions.forEach(el => el.currency === currency ? totalBalance += el.amount : 0);

        return totalBalance
    }
}

export class BonusCard implements ICard {
    transactions: Transaction[];

    constructor() {
        this.transactions = [];
    }

    addTransaction(transaction: Transaction): string;
    addTransaction(currency: CurrencyEnum, amount: number): string;

   
    addTransaction(arg1: CurrencyEnum | Transaction, arg2?: number): string {
        if (arg1 instanceof Transaction) {
            this.transactions.push(arg1);
            return arg1.id;
        } else if (typeof arg1 === 'number' && arg2 !== undefined) {
            const transaction = new Transaction(arg2, arg1);
            this.addBonusTransaction(arg1, arg2);
            this.transactions.push(transaction);
            return transaction.id;
        } else {
            throw new Error('Invalid arguments for addTransaction');
        }
    }

    addBonusTransaction(currency: CurrencyEnum, amount: number): void {
        const bonusAmount = amount * 0.1;
        const bonusTransaction = new Transaction(bonusAmount, currency);
        this.transactions.push(bonusTransaction);
    }

    getTransaction(id: string): Transaction | undefined {
        return this.transactions.find(transaction => transaction.id === id)
    }

    getBalance(currency: CurrencyEnum): number {
        let totalBalance = 0;

        this.transactions.forEach(el => el.currency === currency ? totalBalance += el.amount : 0);

        return totalBalance
    }
}

export class Pocket {
    cards: { [name: string]: ICard };

    constructor() {
        this.cards = {};
    }

    addCard(name: string, card: ICard): void {
        this.cards[name] = card;
    }
    removeCard(name: string): void {
        delete this.cards[name];
    }
    getCard (name: string): ICard | undefined {
        return this.cards[name];
    }
    getTotalAmount  (currency: CurrencyEnum): number {
        return Object.values(this.cards)
        .reduce((totalAmount, card) => {
            return totalAmount + card.getBalance(currency);
        }, 0);
    }
}