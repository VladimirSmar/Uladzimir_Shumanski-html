import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Item } from '../../Model/shopItem';
import { ShopService } from '../../Services/shop.service';

@Component({
  selector: 'app-shop-search',
  templateUrl: './shop-search.component.html',
  styleUrls: ['./shop-search.component.css']
})
export class ShopSearchComponent implements OnInit {

  itemList$: Observable<Item[]>;
  private _searchTerms = new Subject<string>();

  constructor(private _shopService: ShopService) { }

  search(term: string): void {
    this._searchTerms.next(term);
  }

  ngOnInit(): void {
    this.itemList$ = this._searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this._shopService.searchItems(term)),
    );
  }

}
