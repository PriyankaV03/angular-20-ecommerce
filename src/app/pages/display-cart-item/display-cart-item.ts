import { Component, computed, inject, input } from '@angular/core';
import { CartItem } from '../../models/cart';
import { QtySelector } from "../../components/qty-selector/qty-selector";
import { EcommerceStore } from '../../ecommerce-store';
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'psv-display-cart-item',
  imports: [QtySelector, MatIconButton, MatIcon],
  templateUrl: './display-cart-item.html',
  styleUrl: './display-cart-item.scss',
})
export class DisplayCartItem {
  cartItem = input.required<CartItem>();
  store = inject(EcommerceStore);

  total = computed(() => (this.cartItem().product.price * this.cartItem().quantity).toFixed(2))
}
