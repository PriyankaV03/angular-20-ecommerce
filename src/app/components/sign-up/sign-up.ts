import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatSuffix, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignUpParams } from '../../models/user';
import { SignIn } from '../sign-in/sign-in';

@Component({
  selector: 'psv-sign-up',
  imports: [MatIconButton, MatIcon, MatDialogClose, MatFormField, MatIcon, MatSuffix, MatPrefix, MatAnchor, MatInput, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);
  dialogRef = inject(MatDialogRef);
  dialog = inject(MatDialog);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  signUpForm = this.fb.group({
    name: ['Sara V', Validators.required],
    email: ['sara@test.com', Validators.required],
    password: ['sara@1234', Validators.required],
    confirmPassword: ['sara@1234', Validators.required]
  })

  signUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.signUpForm.value;
    this.store.signUp({ name, email, password, dialogId: this.dialogRef.id ?? '', checkout: this.data?.checkout } as SignUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.dialog.open(SignIn, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout
      }
    })
  }
}
