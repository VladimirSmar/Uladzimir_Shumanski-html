import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Item } from '../Model/shopItem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const itemList = [
      { id: 1, title: 'Mr. Nice', price: 100 },
      { id: 2, title: 'Narco', price: 200 },
      { id: 3, title: 'Bombasto', price: 300 },
      { id: 4, title: 'Celeritas', price: 400 },
      { id: 5, title: 'Magneta', price: 500 },
      { id: 6, title: 'RubberMan', price: 600 },
      { id: 7, title: 'Dynama', price: 700 },
      { id: 8, title: 'Dr IQ', price: 800 },
      { id: 9, title: 'Magma', price: 900 },
      { id: 10, title: 'Tornado', price: 1000 }
    ];
    return {itemList};
  }

  genId(itemList: Item[]): number {
    return itemList.length > 0 ? Math.max(...itemList.map(item => item.id)) + 1 : 11;
  }
}