import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ListCartItems } from "./list-cart-items/list-cart-items";
import { TeaseWishlist } from './tease-wishlist/tease-wishlist';
import { OrderSummary } from '../../components/order-summary/order-summary';
import { MatAnchor } from "@angular/material/button";
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'psv-view-cart',
  imports: [BackButton, ListCartItems, TeaseWishlist, OrderSummary, MatAnchor],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
})
export default class ViewCart {
  store = inject(EcommerceStore);
}
