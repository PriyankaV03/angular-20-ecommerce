import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../../ecommerce-store';
import { ViewPanel } from '../../../directives/view-panel';
import { MatAnchor } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'psv-tease-wishlist',
  imports: [MatIcon, ViewPanel, MatAnchor, RouterLink],
  templateUrl: './tease-wishlist.html',
  styleUrl: './tease-wishlist.scss',
})
export class TeaseWishlist {
  store = inject(EcommerceStore);
}
