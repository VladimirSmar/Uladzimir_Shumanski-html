import { Component, OnInit } from '@angular/core';

import { Item } from '../../Model/shopItem';
import { ShopService } from '../../Services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

    defaultItem: Item = {
    id: 0,
    title: "DefaultTitle",
    price: 666
  }

  itemList: Item[];

  constructor(private _shopService: ShopService) { }

  ngOnInit() {
    this.getItemList();
  }

  getItemList(): void {
    this._shopService.getItemList()
    .subscribe(itemList => this.itemList = itemList);
  }

  add(title: string, price: number): void {
    if (!title || !price) { return; }
    this._shopService.addItem({ title, price } as Item)
      .subscribe(item => {
        this.itemList.push(item);
      });
  }

  delete(item: Item): void {
    this.itemList = this.itemList.filter(h => h !== item);
    this._shopService.deleteItem(item).subscribe();
  }

  sortItemList(filter: string): void {
    if (this.itemList.length < 1  ) { return; }
    this.itemList = this._shopService.sortItemList(this.itemList, filter);
  }
}