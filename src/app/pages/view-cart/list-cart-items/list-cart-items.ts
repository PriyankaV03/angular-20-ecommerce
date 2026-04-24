import { Component, inject } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { EcommerceStore } from '../../../ecommerce-store';
import { DisplayCartItem } from '../../display-cart-item/display-cart-item';

@Component({
  selector: 'psv-list-cart-items',
  imports: [ViewPanel, DisplayCartItem],
  templateUrl: './list-cart-items.html',
  styleUrl: './list-cart-items.scss',
})
export class ListCartItems {
  store = inject(EcommerceStore);
}
