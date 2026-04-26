import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/product';
import { TitleCasePipe } from '@angular/common';
import { StockStatus } from '../stock-status/stock-status';
import { QtySelector } from "../../../components/qty-selector/qty-selector";
import { EcommerceStore } from '../../../ecommerce-store';
import { MatIcon } from "@angular/material/icon";
import { ToggleWishlistButton } from "../../../components/toggle-wishlist-button/toggle-wishlist-button";
import { MatIconButton, MatButton } from "@angular/material/button";
import { StarRating } from '../../../components/star-rating/star-rating';

@Component({
  selector: 'psv-product-info',
  imports: [TitleCasePipe, StockStatus, QtySelector, MatIcon, ToggleWishlistButton, MatIconButton, MatButton, StarRating],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss',
})
export class ProductInfo {
  product = input.required<Product>();
  store = inject(EcommerceStore);
  quantity = signal(1);
}
