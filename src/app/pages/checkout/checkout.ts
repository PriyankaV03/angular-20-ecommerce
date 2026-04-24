import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ShippingForm } from './shipping-form/shipping-form';
import { PaymentForm } from './payment-form/payment-form';
import { OrderSummary } from '../../components/order-summary/order-summary';
import { EcommerceStore } from '../../ecommerce-store';
import { MatAnchor, MatButton } from "@angular/material/button";

@Component({
  selector: 'psv-checkout',
  imports: [BackButton, ShippingForm, PaymentForm, OrderSummary, MatAnchor, MatButton],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export default class Checkout {
  store = inject(EcommerceStore);
}
