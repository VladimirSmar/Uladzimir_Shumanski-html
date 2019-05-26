import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Item } from '../Model/shopItem';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ShopService {

  private _itemsUrl = 'api/itemList';

  constructor(
    private _http: HttpClient) { }

  getItemList(): Observable<Item[]> {
    return this._http.get<Item[]>(this._itemsUrl)
      .pipe(
        catchError(this._handleError<Item[]>('getItemList', []))
      );
  }

  getItemNo404<Data>(id: number): Observable<Item> {
    const url = `${this._itemsUrl}/?id=${id}`;
    return this._http.get<Item[]>(url)
      .pipe(
        map(itemList => itemList[0]),
        catchError(this._handleError<Item>(`getItem id=${id}`))
      );
  }

  getItem(id: number): Observable<Item> {
    const url = `${this._itemsUrl}/${id}`;
    return this._http.get<Item>(url).pipe(
      catchError(this._handleError<Item>(`getItem id=${id}`))
    );
  }

  sortItemList(items: Item[], filter: string): Item[] {
     if (typeof items[0][filter] === 'string' || items[0][filter] instanceof String) {
      return items.sort((a, b) => (a[filter].toLowerCase() > b[filter].toLowerCase())
        ? 1 : ((b[filter].toLowerCase() > a[filter].toLowerCase())
          ? -1 : 0));
    } else { 
      return items.sort((a, b) => (+a[filter] > +b[filter])
        ? 1 : ((+b[filter] > +a[filter])
          ? -1 : 0));
    }
  }

  searchItems(term: string): Observable<Item[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this._http.get<Item[]>(`${this._itemsUrl}/?title=${term}`)
      .pipe(
        catchError(this._handleError<Item[]>('searchItems', []))
      );
  }

  addItem(item: Item): Observable<Item> {
    return this._http.post<Item>(this._itemsUrl, item, httpOptions)
      .pipe(
        catchError(this._handleError<Item>('addItem'))
      );
  }

  deleteItem(item: Item | number): Observable<Item> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this._itemsUrl}/${id}`;

    return this._http.delete<Item>(url, httpOptions)
      .pipe(
        catchError(this._handleError<Item>('deleteItem'))
      );
  }

  updateItem(item: Item): Observable<any> {
    return this._http.put(this._itemsUrl, item, httpOptions)
      .pipe(
        catchError(this._handleError<any>('updateItem'))
      );
  }

  private _handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log("operation !" + operation + "! failed");
      console.error(error);

      return of(result as T);
    };
  }
}