import { Component, inject, signal } from '@angular/core';
import { MatIconButton, MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input'
import { SignInParams } from '../../models/user';
import { EcommerceStore } from '../../ecommerce-store';
import { SignUp } from '../sign-up/sign-up';

@Component({
  selector: 'psv-sign-in',
  imports: [MatIconButton, MatIcon, MatDialogClose, MatFormField, MatIcon, MatSuffix, MatPrefix, MatAnchor, MatInput, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);

  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef);
  dialog = inject(MatDialog);

  passwordVisible = signal(false);

  signInForm = this.fb.group({
    email: ['sara@test.com', Validators.required],
    password: ['sara@1234', Validators.required]
  })

  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;

    this.store.signIn({ email, password, checkout: this.data?.checkout, dialogId: this.dialogRef.id } as SignInParams);
  }

  openSignUpDialog() {
    this.dialogRef.close();
    this.dialog.open(SignUp, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout
      }
    })
  }
}
