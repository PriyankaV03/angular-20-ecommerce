import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';

@Component({
  selector: 'psv-header',
  imports: [MatToolbar, HeaderActions],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
