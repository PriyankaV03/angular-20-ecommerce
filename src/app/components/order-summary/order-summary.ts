import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import { EcommerceStore } from '../../ecommerce-store';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'psv-order-summary',
  imports: [ViewPanel, DecimalPipe],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss',
})
export class OrderSummary {
  store = inject(EcommerceStore);

  subtotal = computed(() => this.store.cartItems().reduce((accu, item) => accu + (item.product.price * item.quantity), 0));
  tax = computed(() => 0.05 * this.subtotal());

  total = computed(() => this.subtotal() + this.tax());
}
