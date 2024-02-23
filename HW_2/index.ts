import fs from "fs";


interface Schema {
    [key: string]: string | number | Date;
  }

class FileDB {
    private schemas: { [key: string]: Schema } = {};
  
    registerSchema(tableName: string, schema: Schema): void {
      this.schemas[tableName] = schema;
    }
  
    getTable(tableName: string) {
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
  
    getAll(): any[] {
      const data = fs.readFileSync(`${this.tableName}.json`, 'utf-8');
      return JSON.parse(data);
    }
  
    getById(id: string): any {
      const data = fs.readFileSync(`${this.tableName}.json`, 'utf-8');
      const records = JSON.parse(data);
      return records.find((record: any) => record.id === id);
    }
    
    create(data: Schema): any {
      const id = generateUniqueId();
      const newData = { id, ...data, createDate: new Date() }; // Добавляем дату создания записи
      const records = this.getAllRecords();
      records.push(newData);
      fs.writeFileSync(`${this.tableName}.json`, JSON.stringify(records, null, 2));
      return newData; // Возвращаем созданную запись целиком
    }
  
    update(id: string, newData: Partial<Schema>): any {
      const records = this.getAllRecords();
      const recordToUpdate = records.find((record: any) => record.id === id);
    
      if (!recordToUpdate) {
        throw new Error(`Record with id ${id} not found`);
      }
    
      Object.assign(recordToUpdate, newData, { updatedDate: new Date() });
      fs.writeFileSync(`${this.tableName}.json`, JSON.stringify(records, null, 2));
      
      return recordToUpdate;
    }
  
    delete(id: string): string {
      const records = this.getAllRecords();
      const filteredRecords = records.filter((record: any) => record.id !== id);
      fs.writeFileSync(`${this.tableName}.json`, JSON.stringify(filteredRecords, null, 2));
      return id;
    }
  
    private getAllRecords(): any[] {
      try {
        const data = fs.readFileSync(`${this.tableName}.json`, 'utf-8');
        return JSON.parse(data);
      } catch (err) {
        return [];
      }
    }
  }
  
  function generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  
  export { FileDB };