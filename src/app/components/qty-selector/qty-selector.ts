import { Component, input, output } from '@angular/core';
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'psv-qty-selector',
  imports: [MatIconButton, MatIcon],
  templateUrl: './qty-selector.html',
  styleUrl: './qty-selector.scss',
})
export class QtySelector {
  quantity = input<number>(0);
  quantityUpdated = output<number>();
}
