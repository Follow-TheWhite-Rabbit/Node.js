import fs from "fs";


// 1. Singleton: В классе FileDB есть приватное свойство schemas, которое хранит все схемы базы данных. Это похоже на реализацию паттерна Singleton, поскольку класс FileDB предоставляет единственный доступ к этому хранилищу схем.

// 2. Фабрика: Метод getTable в классе FileDB может рассматриваться как фабричный метод, который создает и возвращает объект Table в зависимости от запрошенной таблицы.

interface NewsPost {
    id: string;
    title?: string;
    text?: string;
    createDate: Date;
    updatedDate?: Date;
}

interface Schema {
    [key: string]: string | number | Date;
}

class FileDB {
    private schemas: { [key: string]: Schema } = {};

    registerSchema(tableName: string, schema: Schema): void {
        this.schemas[tableName] = schema;
    }

    getTable(tableName: string): Table {
        const schema = this.schemas[tableName];

        if (!schema) {
            throw new Error(`Schema for table ${tableName} is not registered`);
        }

        return new Table(tableName, schema);
    }
}

class Table {
    private tableName: string;
    private schema: Schema;

    constructor(tableName: string, schema: Schema) {
        this.tableName = tableName;
        this.schema = schema;
        this.initializeDatabase();
    }

    private initializeDatabase(): void {
        if (!fs.existsSync(`${this.tableName}.json`)) {
            fs.writeFileSync(`${this.tableName}.json`, '[]', 'utf-8');
        }
    }

    getAll(): NewsPost[] {
        const data = fs.readFileSync(`${this.tableName}.json`, 'utf-8');
        return JSON.parse(data);
    }

    getById(id: string): NewsPost | undefined {
        const data = fs.readFileSync(`${this.tableName}.json`, 'utf-8');
        const records: NewsPost[] = JSON.parse(data);
        return records.find((record: NewsPost) => record.id === id);
    }

    create(data: Schema): NewsPost {
        const id = generateUniqueId();
        const newData: NewsPost = { id, ...data, createDate: new Date() };
        const records = this.getAll();
        records.push(newData);
        fs.writeFileSync(`${this.tableName}.json`, JSON.stringify(records, null, 2));
        return newData;
    }

    update(id: string, newData: Partial<Schema>): NewsPost {
        const records = this.getAll();
        const recordToUpdate = records.find((record: NewsPost) => record.id === id);

        if (!recordToUpdate) {
            throw new Error(`Record with id ${id} not found`);
        }

        Object.assign(recordToUpdate, newData, { updatedDate: new Date() });
        fs.writeFileSync(`${this.tableName}.json`, JSON.stringify(records, null, 2));

        return recordToUpdate;
    }

    delete(id: string): string {
        const records = this.getAll();
        const filteredRecords = records.filter((record: NewsPost) => record.id !== id);
        fs.writeFileSync(`${this.tableName}.json`, JSON.stringify(filteredRecords, null, 2));
        return id;
    }
}

function generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
}

export { FileDB };