import { v4 as uuidv4 } from 'uuid';



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

export class Card {
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