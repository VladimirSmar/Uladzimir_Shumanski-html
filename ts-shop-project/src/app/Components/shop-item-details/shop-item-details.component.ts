import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item } from '../../Model/shopItem';
import { ShopService } from '../../Services/shop.service';

@Component({
  selector: 'app-shop-item-details',
  templateUrl: './shop-item-details.component.html',
  styleUrls: ['./shop-item-details.component.css']
})
export class ShopItemDetailsComponent implements OnInit {

  @Input() item: Item;

  constructor(
    private _route: ActivatedRoute,
    private _shopService: ShopService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    const id = +this._route.snapshot.paramMap.get('id');
    this._shopService.getItem(id)
      .subscribe(item => this.item = item);
  }

  goBack(): void {
    this._location.back();
  }

  save(): void {
    if (!this.item.title || !+this.item.price) { return; }
    this.item.price = +this.item.price;
    this._shopService.updateItem(this.item)
      .subscribe(() => this.goBack());
  }

}
